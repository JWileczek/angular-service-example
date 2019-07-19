import {Injectable} from '@angular/core';
import {infrastructure} from '../../simple-infrastructure/refactorInfra';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {

  constructor() {
    infrastructure.initInfrastructure('ServicePath', 'ServiceSession', 'ServiceProgram');
  }

  get infrastructureObject() {
    return infrastructure;
  }
}
