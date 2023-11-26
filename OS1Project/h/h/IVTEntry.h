/*
 * IVTEntry.h
 *
 *  Created on: Aug 23, 2021
 *      Author: OS1
 */

#ifndef IVTENTRY_H_
#define IVTENTRY_H_
#include "event.h"
#include "KernelEv.h"
typedef unsigned char IVTNo;
typedef void interrupt(*pInterrupt)(...);
class KernelEv;
class IVTEntry {
	public:
	static IVTEntry* arrayOfIVTEntry[256];
	KernelEv* kerEv;
	IVTEntry(IVTNo num, pInterrupt newRoutine);//zavrseno
	~IVTEntry();//zavrseno
	void signal();//zavrseno
	void callOld();//zavrseno

	private:
	IVTNo entry;
	pInterrupt oldRoutine;
};

#endif /* IVTENTRY_H_ */
