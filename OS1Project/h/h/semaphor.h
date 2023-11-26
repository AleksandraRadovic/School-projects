/*
 * Semaphor.h
 *
 *  Created on: Aug 19, 2021
 *      Author: OS1
 */

#ifndef SEMAPHOR_H_
#define SEMAPHOR_H_

typedef unsigned int Time;
class KerneSem;

class Semaphore {
public:
 Semaphore (int init=1);//zavrseno
virtual ~Semaphore ();//zavrseno
 virtual int wait (Time maxTimeToWait);//zavrseno
 virtual void signal();//zavrseno
 int val () const; // Returns the current value of the semaphore, zavrseno
private:
 KerneSem* myImpl;

};

#endif /* SEMAPHOR_H_ */
