import {Injectable} from '@angular/core';
import {Infrastructure} from '../../simple-infrastructure/newInfra';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {
  infrastructureObject;

  constructor() {
    this.infrastructureObject = Object.create(Infrastructure);
    this.infrastructureObject.initInfrastucture('ServicePath', 'ServiceSession', 'ServiceProgram');
  }
}
