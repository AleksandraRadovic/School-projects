/*
 * List.cpp
 *
 *  Created on: Aug 6, 2021
 *      Author: OS1
 */

#include "List.h"
#include "Schedule.h"
#define lock() {asm{pushf}asm{cli}}
#define unlock() {asm{popf}}
List::List(){
	first=last=0;
	Elems=0;
}

List::~List(){
	Elem* old;
	while(first){
		old=first;
		first=first->next;
		delete old;
	}
	first=last=0;
	Elems=0;
}

void List::addToList(PCB* elem){

	//lock();
	Elem* newElem= new Elem(elem);
	if(!first)first=last=newElem;
	else{
		last->next=newElem;
		last=newElem;
	}
	Elems++;
	//unlock();

}

void List::deleteFromList(PCB* elem){
	if(first->info->id==elem->id){
		Elem* cur=first;
		first=first->next;
		delete cur;
		Elems--;
	}
	else{
	Elem* cur=first;
	Elem* old=cur;
	while(cur){
		if(cur->info->id==elem->id){
			old->next=cur->next;
			old=cur;
			cur=cur->next;
		delete old;
		Elems--;
		break;}
		else{
			old=cur;
			cur=cur->next;
		}
	}
	}
}

Thread* List::ThreadByID(int id){
	Elem* cur=first;
	while(cur){
		if(cur->info->id==id){return cur->info->myThread;}
		cur=cur->next;
	}
	return 0;
}

PCB* List::getPCB(){

	//lock();
	if(!first) return 0;
	Elem* cur=first;
	first=first->next;
	if(!first) last=0;
	Elems--;
	return cur->info;
	//unlock();

}
int List::getElems(){
	return Elems;
}
 void List::freeBecauseOfTimer(){
	 Elem* cur=first;
	 Elem* prev=0;
	 lock();
	 while(cur){
		 cur->info->timeToWait--;
		 if(!cur->info->timeToWait){
			 cur->info->timeElapsed=1;
			 Elems--;
cur->info->blocked=0;
cur->info->ready=1;
Scheduler::put((PCB*)cur->info);
if(!prev){
	first=first->next;
	if(!first) last=0;
	cur=first;
}
else{
	prev->next=cur->next;
	if(cur==last)last=prev;
	cur=cur->next;
}
	 }

		 else{
			 prev=cur;
			 cur=cur->next;
		 }
 }
	 unlock();
}
