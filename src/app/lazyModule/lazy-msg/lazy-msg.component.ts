import {Component, OnInit} from '@angular/core';
import {RandomMsgService} from '../../services/random-message.service';

@Component({
  selector: 'app-lazy-msg',
  templateUrl: './lazy-msg.component.html',
  styleUrls: ['./lazy-msg.component.css'],
  providers: [RandomMsgService] // Will provide a new instance of service to every component instance.
})
export class LazyMsgComponent implements OnInit {

  randomMsg = 'Default Message';

  constructor(private randomMsgService: RandomMsgService) {
  }

  ngOnInit() {
    this.randomMsg = this.randomMsgService.getMessage();
  }

}
