import {Injectable} from '@angular/core';
import {storageDefaultProvider} from './storage.provider';

export interface BackendStorageInterface {
  connect(): boolean;

  getItem(path: string): any;

  writeItem(path: string, bytes: any[]): void;
}

@Injectable({
  providedIn: 'root',
  useFactory: storageDefaultProvider.useFactory
})
export abstract class StorageService implements BackendStorageInterface {

  abstract connect(): boolean;

  abstract getItem(path: string): any;

  abstract writeItem(path: string, bytes: any[]): void;

}
