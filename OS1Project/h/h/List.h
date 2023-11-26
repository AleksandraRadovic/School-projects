/*
 * List.h
 *
 *  Created on: Aug 6, 2021
 *      Author: OS1
 */

#ifndef LIST_H_
#define LIST_H_
#include "PCB.h"
#include "thread.h"
class PCB;
class Thread;
class List {
public:
	struct Elem{
		PCB* info;
		Elem* next;
		Elem(PCB* iinfo){
			info=iinfo;
			next=0;
		}
	};
private:
	Elem *first, *last;
	int Elems;
	public:
	List();
	void addToList(PCB* elem);//zavrseno
void deleteFromList(PCB* elem);//zavrseno
int getElems();//zavrseno
~List();//zavrseno
Thread* ThreadByID(int id);//zavrseno
PCB* getPCB();//zavrseno
void freeBecauseOfTimer();
};

#endif /* LIST_H_ */
