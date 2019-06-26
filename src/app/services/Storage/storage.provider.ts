import {StorageService} from './storage.service';
import {AppConfigService} from '../../app.config';
import {FilesystemStrategy} from './Strategies/file.strategy';
import {S3Strategy} from './Strategies/s3.strategy';

export enum StorageBackends {
  S3 = 's3',
  FS = 'fs',
}

export const storageFactory = () => {
  const settings = AppConfigService.settings;
  const backendConfig = settings.backendConfigs[settings.defaultBackend];
  let backend = null;
  switch (settings.defaultBackend) {
    case StorageBackends.S3: {
      backend = new S3Strategy(backendConfig);
      break;
    }
    case StorageBackends.FS: {
      backend = new FilesystemStrategy(backendConfig);
      break;
    }
  }
  return backend;
};

export let storageDefaultProvider =
  {
    provide: StorageService,
    useFactory: storageFactory,
    deps: []
  };
