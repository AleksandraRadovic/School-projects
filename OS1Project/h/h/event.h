/*
 * Event.h
 *
 *  Created on: Aug 23, 2021
 *      Author: OS1
 */

#ifndef EVENT_H_
#define EVENT_H_
#include "IVTEntry.h"
#define PREPAREENTRY(Entry, Old)\
void interrupt interruptRoutine##Entry(...);\
IVTEntry newEnt##Entry(Entry, interruptRoutine##Entry);\
	void interrupt interruptRoutine##Entry(...){\
	newEnt##Entry.signal();\
if(Old==1)\
	newEnt##Entry.callOld();}

typedef unsigned char IVTNo;
class KernelEv;

class Event {
public:
 Event (IVTNo ivtNo);//zavrseno
 ~Event ();//zavrseno
 void wait ();//zavrseno
protected:
 friend class KernelEv;
 void signal(); // can call KernelEv, zavrseno
private:
 KernelEv* myImpl;
};

#endif /* EVENT_H_ */
