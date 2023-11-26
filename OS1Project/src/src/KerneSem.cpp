/*
 * KerneSem.cpp
 *
 *  Created on: Aug 19, 2021
 *      Author: OS1
 */

#include "KerneSem.h"
#include"Schedule.h"
#define lock() {asm{pushf}asm{cli}}
#define unlock() {asm{popf}}
//int k=0;
KerneSem::KerneSem(int forInit){
	val=forInit;
	k=0;
	waitingOnMe=new List();
	waitingOnMeWithInterval=new List();
}
KerneSem::~KerneSem(){
	delete waitingOnMe;
	delete waitingOnMeWithInterval;
}
int KerneSem::wait(Time maxTimeToWait){
lock();
if(--val<0){
	if(maxTimeToWait){//kada se blokira odredjino vreme
	 PCB::running->timeToWait=maxTimeToWait;
	 PCB::running->ready=0;
	 PCB::running->blocked=1;
	 waitingOnMeWithInterval->addToList((PCB*)PCB::running);
	 dispatch();
	}
	else{//kada je maxTimeToWait=0
		PCB::running->ready=0;
		PCB::running->blocked=1;
		waitingOnMe->addToList((PCB*)PCB::running);
		dispatch();
	}
}

if(PCB::running->timeElapsed){
	PCB::running->timeElapsed=0;
	val++;
	unlock();
	return 0;
}
	unlock();
	return 1;
}
void KerneSem::signal(){
lock();
	if(++val<=0){
if(!k){
	if(waitingOnMe->getElems()!=0){
	PCB* pcb=waitingOnMe->getPCB();
	pcb->blocked=0;
	pcb->ready=1;
	Scheduler::put(pcb);
	k=!k;
	unlock();
	}
	else {
		if(waitingOnMeWithInterval->getElems()!=0){
			PCB* pcb=waitingOnMeWithInterval->getPCB();
			pcb->blocked=0;
			pcb->ready=1;
			Scheduler::put(pcb);
			k=!k;
			unlock();
		}

	}
}
else{
	if(waitingOnMeWithInterval->getElems()!=0){
	PCB* pcb=waitingOnMeWithInterval->getPCB();
	pcb->blocked=0;
	pcb->ready=1;
	Scheduler::put(pcb);
	k=!k;
	unlock();
}
	else {
		if(waitingOnMe->getElems()!=0){
			PCB* pcb=waitingOnMe->getPCB();
			pcb->blocked=0;
			pcb->ready=1;
			Scheduler::put(pcb);
			k=!k;
			unlock();
	}
	}
}
}
}
int KerneSem::value()const{return val;}
