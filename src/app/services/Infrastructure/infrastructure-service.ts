import {Injectable} from '@angular/core';
import {Infrastructure} from '../../simple-infrastructure/refactorInfra';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {
  infrastructure: Infrastructure = null;
  constructor() {
    this.infrastructure = new Infrastructure();
    this.infrastructure.initInfrastructure('ServicePath', 'ServiceSession', 'ServiceProgram');
  }

  get infrastructureObject() {
    return this.infrastructure;
  }
}
