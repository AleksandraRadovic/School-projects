/*
 * KerneSem.h
 *
 *  Created on: Aug 19, 2021
 *      Author: OS1
 */

#ifndef KERNESEM_H_
#define KERNESEM_H_
#include "List.h"
#include "semaphor.h"
class KerneSem {
public:
	KerneSem(int forInit);//zavrseno
	~KerneSem();//zavrseno
	int wait(Time maxTimeToWait);//zavrseno
	void signal();//zavrseno
	int value()const;//zavrseno
	List* waitingOnMeWithInterval;
	List* waitingOnMe;
private:
	 int val;
	int k;//treba mi za signal da znam iz koje liste uzima
};

#endif /* KERNESEM_H_ */
