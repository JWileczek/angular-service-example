import {RandomMsgService} from './random-message.service';

const randomFactory = () => {
  return new RandomMsgService();
};

export let randomProvider =
  {
    provide: RandomMsgService,
    useFactory: randomFactory,
    deps: []
  };
