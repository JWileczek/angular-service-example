import {Injectable} from '@angular/core';
import {storageFactory} from './storage.provider';

export interface BackendStorageStrategy {
  connect(): boolean;

  getItem(path: string): any;

  writeItem(path: string, bytes: any[]): void;
}

@Injectable({
  providedIn: 'root',
  useFactory: storageFactory
})
export abstract class StorageService implements BackendStorageStrategy {

  abstract connect(): boolean;

  abstract getItem(path: string): any;

  abstract writeItem(path: string, bytes: any[]): void;

}
