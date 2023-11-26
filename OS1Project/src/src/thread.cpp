/*
 * Thread.cpp
 *
 *  Created on: Aug 10, 2021
 *      Author: OS1
 */

#include "thread.h"

#include "List.h"
#include "PCB.h"
List* PCBs=new List();
int isStarting=1;
static ID iid=1;
extern PCB* startingPCB;
Thread::Thread(StackSize stackSize, Time timeSlice){
	if(!isStarting){
	myPCB=new PCB(stackSize, timeSlice, this,iid);
	PCBs->addToList(myPCB);
	iid++;}
	else {
		myPCB=startingPCB;
		isStarting=0;
	}
}

ID Thread::getId(){
	return myPCB->id;
}

void Thread::start(){
	myPCB->start();
}

void Thread::waitToComplete(){
	myPCB->waitToComlete();
}
Thread* Thread::getThreadById(ID id){
		return PCBs->ThreadByID(id);

	}

ID Thread::getRunningId(){
	return PCB::running->id;
}
Thread::~Thread(){
	waitToComplete();
	//if(myPCB) delete myPCB;
}
