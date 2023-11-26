/*
 * PCB.h
 *
 *  Created on: Aug 6, 2021
 *      Author: OS1
 */

#ifndef PCB_H_
#define PCB_H_
#include "List.h"
#include "thread.h"
class List;
class PCB {
public:
	unsigned sp;
	unsigned ss;
	unsigned bp;
	unsigned *stack;
	int blocked;
	int finished;
	int ready;
	static ID iid;
	int id;
    Time timeSlice;
	volatile static PCB* running;
	Thread* myThread;
	Thread* startingThread;//pocetna nit, ona koja mi sluzi kada se tek pokrene, kada je rasporedjivac prazan
    List* waitingWTC;//lista za waitToComplete
    int timeToWait;
    int timeElapsed;
    int hasInterval;
PCB(StackSize stackSize, Time ts, Thread* thread, ID iid);//zavrseno, za ono sto nije videlo, ako se pojavi uljuciti onaj BCC_BLOCK_IGNORE
~PCB();//zavrseno
void waitToComlete();
void start();//zavrseno, videti za syntax error; to je ok rekli na vezbama
static void wrapper();//zavrseno

};

#endif /* PCB_H_ */
