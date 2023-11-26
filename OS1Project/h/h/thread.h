/*
 * Thread.h
 *
 *  Created on: Aug 10, 2021
 *      Author: OS1
 */

#ifndef THREAD_H_
#define THREAD_H_
//#include"PCB.h"
typedef unsigned long StackSize;
const StackSize defaultStackSize = 4096;
typedef unsigned int Time;
const Time defaultTimeSlice = 2;
typedef int ID;
class PCB;
class Thread {
public:
 void start();//zavrseno
 void waitToComplete();
 virtual ~Thread();
 ID getId();//zavrseno
 static ID getRunningId();//zavrseno
 static Thread * getThreadById(ID id);//zavrseno
protected:
 friend class PCB;
 Thread (StackSize stackSize = defaultStackSize, Time timeSlice =defaultTimeSlice);//zavrseno
 virtual void run() {}
private:
 PCB* myPCB;
};
void dispatch();//zavrseno

#endif /* THREAD_H_ */
