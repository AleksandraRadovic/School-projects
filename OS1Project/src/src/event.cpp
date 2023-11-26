/*
 * Event.cpp
 *
 *  Created on: Aug 23, 2021
 *      Author: OS1
 */

#include "event.h"
#include "KernelEv.h"

Event::Event(IVTNo ivtNo){
	myImpl=new KernelEv((PCB*)PCB::running, ivtNo);
}
Event::~Event(){
	//if(myImpl) delete myImpl;
}
void Event::wait(){
	myImpl->wait();
}
void Event::signal(){
myImpl->signal();
}

