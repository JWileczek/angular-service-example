import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

export interface AppConfig {
  env: {
    name: string;
  };
  information: {
    message: 'Some Message'
  };
  defaultBackend: string;
  backendConfigs: {
    s3: {
      uri: 'API',
      secretKey: 'blah',
      accessKey: 'something',
      bucket: 'test'
    },
    fs: {
      uri: '~/example/'
    }
  };
}

@Injectable()
export class AppConfigService {
  static settings: AppConfig;

  constructor(private http: HttpClient) {
  }

  load() {
    const jsonFile = `assets/config/config.${environment.name}.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: AppConfig) => {
        AppConfigService.settings = <AppConfig> response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
