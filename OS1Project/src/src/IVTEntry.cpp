/*
 * IVTEntry.cpp
 *
 *  Created on: Aug 23, 2021
 *      Author: OS1
 */

#include "IVTEntry.h"
#include "dos.h"

#include "event.h"
#define lock() {asm{pushf}asm{cli}}
#define unlock() {asm{popf}}
IVTEntry* IVTEntry::arrayOfIVTEntry[256]={0};
IVTEntry::IVTEntry(IVTNo num, pInterrupt newRoutine){
	lock();
	this->entry=num;
	arrayOfIVTEntry[entry]=this;
	this->kerEv=0;
#ifndef BCC_BLOCK_IGNORE
	oldRoutine=getvect(entry);
	setvect(entry, newRoutine);
#endif
unlock();
}
IVTEntry::~IVTEntry(){
lock();
//arrayOfIVTEntry[entry]=0;
setvect(entry, oldRoutine);
//callOld();
unlock();
}
void IVTEntry::signal(){
	lock();
	kerEv->signal();
	unlock();
}
void IVTEntry::callOld(){
	lock();
	if(oldRoutine)
oldRoutine();
unlock();
}
