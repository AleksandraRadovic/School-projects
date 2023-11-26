/*
 * KernelEv.h
 *
 *  Created on: Aug 23, 2021
 *      Author: OS1
 */

#ifndef KERNELEV_H_
#define KERNELEV_H_
#include "event.h"
#include "PCB.h"
typedef unsigned char IVTNo;
class KernelEv {
public:
	KernelEv(PCB* maker, IVTNo entry);//zavrseno
	~KernelEv();//zavrseno
	void signal();//zavrseno
	void wait();//zavrseno
private:
	int val;
	IVTNo entry;
	PCB* maker;
	PCB* blocked;//treba mi da znam da li imam blokiranu nit
};

#endif /* KERNELEV_H_ */
