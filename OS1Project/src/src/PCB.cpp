/*
 * PCB.cpp
 *
 *  Created on: Aug 6, 2021
 *      Author: OS1
 */

#include<dos.h>
#include "PCB.h"
#include "Schedule.h"
#include "thread.h"
#define lock() {asm{pushf}asm{cli}}
#define unlock() {asm{popf}}
int numOfRunning=0;

volatile PCB* PCB::running=0;
void idle(){while(numOfRunning){}}
void PCB::start(){
	lock();
	numOfRunning++;
	Scheduler::put(this);
	unlock();
}

void PCB::waitToComlete(){
	lock();
	if(!this->finished){
	waitingWTC->addToList((PCB*)PCB::running);
	PCB::running->ready=0;
	PCB::running->blocked=1;
	dispatch();
	}
	unlock();
}
PCB::PCB(StackSize stackSize, Time ts, Thread* thread, ID iid){
	finished=0;
	blocked=0;
	ready=1;
	myThread=thread;
	timeSlice=ts;
	timeToWait=0;
	timeElapsed=0;
	hasInterval=0;
	waitingWTC=new List();
	id=iid;
	if(id==0) {startingThread= new Thread();}
	else if(id==-1){
	stackSize/=sizeof(unsigned);
	stack=new unsigned [stackSize];
	stack[stackSize-1]=0x200;
#ifndef BCC_BLOCK_IGNORE
	stack[stackSize-2]=FP_SEG(idle);
	stack[stackSize-3]=FP_OFF(idle);
	sp=FP_OFF(stack+stackSize-12);
	ss=FP_SEG(stack+stackSize-12);
#endif
	bp=sp;
	}
	else if(id>0){
		stackSize/=sizeof(unsigned);
			stack=new unsigned [stackSize];
			stack[stackSize-1]=0x200;
		#ifndef BCC_BLOCK_IGNORE
			stack[stackSize-2]=FP_SEG(PCB::wrapper);
			stack[stackSize-3]=FP_OFF(PCB::wrapper);
			sp=FP_OFF(stack+stackSize-12);
			ss=FP_SEG(stack+stackSize-12);
		#endif
			bp=sp;
	}
}

PCB::~PCB(){
	delete [] stack;
	delete waitingWTC;
}
 void PCB::wrapper(){
	 PCB::running->myThread->run();
	 int cnt=PCB::running->waitingWTC->getElems();
	 PCB* pcb;
	 for (int i=0;i<cnt;i++){
     pcb=PCB::running->waitingWTC->getPCB();
     pcb->blocked=0;
     pcb->ready=1;
     Scheduler::put(pcb);
	 }
	 PCB::running->finished=1;
	 numOfRunning--;
	 dispatch();
 }

