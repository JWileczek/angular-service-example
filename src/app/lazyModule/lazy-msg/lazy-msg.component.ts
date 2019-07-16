import {Component, OnInit} from '@angular/core';
import {RandomMsgService} from '../../services/random-message.service';
import {Infrastructure} from '../../simple-infrastructure/newInfra';

@Component({
  selector: 'app-lazy-msg',
  templateUrl: './lazy-msg.component.html',
  styleUrls: ['./lazy-msg.component.css'],
  providers: [RandomMsgService] // Will provide a new instance of service to every component instance.
})
export class LazyMsgComponent implements OnInit {

  randomMsg = 'Default Message';
  lazyInfra;
  lazyClientID;
  constructor(private randomMsgService: RandomMsgService) {
    this.lazyInfra = Object.create(Infrastructure);
    this.lazyInfra.initInfrastucture('LazyPath', 'LazySession', 'LazyProgram');
    this.randomMsg = randomMsgService.getMessage();
    this.lazyClientID = this.lazyInfra.clientID;
  }

  ngOnInit() {
  }

}
