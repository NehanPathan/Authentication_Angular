// emitter.service.ts
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmitterService {
  static authEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}
}
