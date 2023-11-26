/*
 * System.cpp
 *
 *  Created on: Aug 14, 2021
 *      Author: OS1
 */

#include<iostream.h>
#include"PCB.h"
#include "List.h"
#include "Schedule.h"
#include "KerneSem.h"
#include <dos.h>

#include "semaphor.h"
#include "thread.h"
#define lock(){asm{pushf}asm{cli}}
#define unlock(){asm{popf}}
volatile int counter=1;
volatile int context_switch_on_demand=0;
unsigned tsp;
unsigned tss;
unsigned tbp;
unsigned oldTimerOFF;
unsigned oldTimerSEG;
PCB* startingPCB=new PCB(4001,2,0,0);
PCB* idlePCB=new PCB(4001,1,0,-1);
extern int userMain(int argc, char* argv[]);
extern  void tick();
extern int IDSem;
extern  KerneSem* arrayOfKerneSem[99];
void interrupt timer(){

	if(!context_switch_on_demand){//ako nije dosao prekid od dispatch(), moram da smanjim counter zbog trajanja izvrsavanja i da proverim liste
		counter--;
	tick();
	for(int i=0; i<IDSem;i++){
		arrayOfKerneSem[i]->waitingOnMeWithInterval->freeBecauseOfTimer();
	}
	}

	if(counter==0 || context_switch_on_demand ){
		asm{//cuvam
			mov tsp, sp
			mov tss, ss
			mov tbp, bp
		}
		PCB::running->sp=tsp;
		PCB::running->ss=tss;
		PCB::running->bp=tbp;
//ovde negde bih trebala da ispitam da li je running nit i dalje spremna, ako jeste, onda treba da je stavim u scheduler
		if(PCB::running->ready  && PCB::running!=idlePCB && !PCB::running->blocked && !PCB::running->finished) Scheduler::put((PCB*)PCB::running);
		PCB::running=Scheduler::get();
		if(PCB::running==0) PCB::running=idlePCB;
        tsp=PCB::running->sp;
        tss=PCB::running->ss;
        tbp=PCB::running->bp;
		counter=PCB::running->timeSlice;

		asm{//restauriram
			mov sp, tsp
			mov ss, tss
			mov bp, tbp
		}
	}

if(!context_switch_on_demand) asm{ int 60h}

context_switch_on_demand=0;

}
void initialize(){
	asm{
		cli
		push es
		push ax

		mov ax, 0
		mov es, ax//u es upisujem 0

		//pamtim staru rutinu
		mov ax, word ptr es:0022h
		mov word ptr oldTimerSEG, ax
		mov ax, word ptr es:0020h
		mov word ptr oldTimerOFF, ax

		//podmecem novu rutinu
		mov word ptr es:0022h, seg timer
	mov word ptr es:0020h, offset timer


		//postavljam staru rutinu na int 60h, jer je on slobodan, mogu da ga korisitim
		mov ax, oldTimerSEG
		mov word ptr es:0182h, ax
		mov ax, oldTimerOFF
		mov word ptr es:0180h, ax

		pop ax
		pop es
		sti
	}
}

void restore(){
	asm{
		cli
		push es
		push ax

		mov ax, 0
		mov es, ax//u es upisujem 0

		//vracam staru rutinu
		mov ax, word ptr oldTimerSEG
		mov word ptr es:0022h, ax
		mov ax, word ptr oldTimerOFF
		mov word ptr es:0020h, ax

		pop ax
		pop es
		sti
	}
}




void dispatch(){
		lock();
		context_switch_on_demand=1;
		timer();
		unlock();
	}
int main(int argc, char* argv[]){
	PCB::running=startingPCB;
	initialize();
int a=userMain(argc, argv);
restore();
	return a;
}
