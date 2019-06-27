import {BackendStorageInterface} from '../storage.service';

export class FilesystemStrategy implements BackendStorageInterface {
  fsConfig: any;

  constructor(config: any) {
    this.fsConfig = config;
  }

  connect(): boolean {
    // Check if storage path is set and exists
    return false;
  }

  getItem(path: string): any {
    return this.fsConfig.uri;
  }

  writeItem(path: string, bytes: any[]): void {
  }

}
