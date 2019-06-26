import {Injectable} from '@angular/core';
import {randomProvider} from './random-message.provider';

// Specifying a module in the `providedIn` will produce an error at runtime if anyone
// attempts to inject service outside of expected module.
@Injectable({
  providedIn: 'root',
  useFactory: randomProvider.useFactory,
})
export class RandomMsgService {

  message = 'Default Information';

  constructor() {
    this.message = `Generating a random number: ${Math.random().toFixed(2)}`;
  }

  getMessage() {
    return this.message;
  }
}
