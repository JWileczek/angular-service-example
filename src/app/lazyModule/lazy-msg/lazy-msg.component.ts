import {Component, OnInit} from '@angular/core';
import {RandomMsgService} from '../../services/random-message.service';
import {Infrastructure} from '../../simple-infrastructure/refactorInfra';

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
    this.lazyInfra = new Infrastructure();
    this.lazyInfra.initInfrastructure('LazyPath', 'LazySession', 'LazyProgram');
    this.randomMsg = randomMsgService.getMessage();
    this.lazyClientID = this.lazyInfra.clientID;
  }

  ngOnInit() {
  }

}
