import {BackendStorageInterface} from '../storage.service';

export class S3Backend implements BackendStorageInterface {
  s3Config: any;

  constructor(config: any) {
    this.s3Config = config;
  }

  connect(): boolean {
    // Check if storage path is set and exists
    return false;
  }

  getItem(path: string): any {
    return this.s3Config.uri;
  }

  writeItem(path: string, bytes: any[]): void {
  }

}
