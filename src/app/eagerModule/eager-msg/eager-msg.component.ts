import {Component, OnInit} from '@angular/core';
import {RandomMsgService} from '../../services/random-message.service';

@Component({
  selector: 'app-eager-list',
  templateUrl: './eager-msg.component.html',
  styleUrls: ['./eager-msg.component.css']
})
export class EagerMsgComponent implements OnInit {
  private storageMsg: any;
  private randomMsg: string;

  constructor(private randomMessageService: RandomMsgService) {
  }

  ngOnInit() {
    this.randomMsg = this.randomMessageService.getMessage();
  }

}
