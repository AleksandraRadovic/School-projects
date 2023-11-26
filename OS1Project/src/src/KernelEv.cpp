/*
 * KernelEv.cpp
 *
 *  Created on: Aug 23, 2021
 *      Author: OS1
 */

#include "KernelEv.h"
#include "PCB.h"
#include "Schedule.h"
#include "IVTEntry.h"
#define lock() {asm{pushf}asm{cli}}
#define unlock() {asm{popf}}

KernelEv::KernelEv(PCB* maker, IVTNo entry){
	this->maker=maker;
	this->entry=entry;
	blocked=0;
	val=0;
	IVTEntry::arrayOfIVTEntry[entry]->kerEv=this;

}
KernelEv::~KernelEv(){
	if(IVTEntry::arrayOfIVTEntry[entry]->kerEv==this)IVTEntry::arrayOfIVTEntry[entry]->kerEv=0;
	delete maker;
	delete blocked;
}
void KernelEv::signal(){
	lock();
	if(blocked==0) val=1;
	else{
		blocked->blocked=0;
		blocked->ready=1;
		Scheduler::put(blocked);
		blocked=0;
		val=0;
		dispatch();
	}
	unlock();
}
void KernelEv::wait(){
	lock();
	if(PCB::running==maker){
		if(val==0){
			PCB::running->ready=0;
			PCB::running->blocked=1;
			blocked=(PCB*)PCB::running;
			val=1;
			dispatch();
		}
		else if(val==1) val=0;
	}
	unlock();
}
