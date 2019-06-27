import {StorageService} from './storage.service';
import {AppConfigService} from '../../app.config';
import {FileSystemBackend} from './Backends/file.backend';
import {S3Backend} from './Backends/s3.backend';

export enum StorageBackends {
  S3 = 's3',
  FS = 'fs',
}

const storageFactory = () => {
  const settings = AppConfigService.settings;
  const backendConfig = settings.backendConfigs[settings.defaultBackend];
  let backend = null;
  switch (settings.defaultBackend) {
    case StorageBackends.S3: {
      backend = new S3Backend(backendConfig);
      break;
    }
    case StorageBackends.FS: {
      backend = new FileSystemBackend(backendConfig);
      break;
    }
  }
  return backend;
};

export let storageDefaultProvider = {
    provide: StorageService,
    useFactory: storageFactory,
    deps: []
  };
