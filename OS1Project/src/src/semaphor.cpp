/*
 * Semaphor.cpp
 *
 *  Created on: Aug 19, 2021
 *      Author: OS1
 */

#include "semaphor.h"

#include "KerneSem.h"
int IDSem=0;
KerneSem* arrayOfKerneSem[99];
 void Semaphore::signal(){
	 myImpl->signal();
 }
 Semaphore::Semaphore(int init){
	 myImpl=new KerneSem(init);
	 arrayOfKerneSem[IDSem++]=myImpl;
 }
 Semaphore::~Semaphore(){
	//delete [] arrayOfKerneSem;
// if(myImpl) delete myImpl;
 }
 int Semaphore::val() const{
	 return myImpl->value();
 }

 int Semaphore::wait(Time maxTimeToWait){
	 return myImpl->wait(maxTimeToWait);
 }
