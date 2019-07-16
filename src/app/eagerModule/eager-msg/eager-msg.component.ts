import {Component, OnInit} from '@angular/core';
import {RandomMsgService} from '../../services/random-message.service';
import {InfrastructureService} from '../../services/Infrastructure/infrastructure-service';

@Component({
  selector: 'app-eager-list',
  templateUrl: './eager-msg.component.html',
  styleUrls: ['./eager-msg.component.css']
})
export class EagerMsgComponent implements OnInit {
  private randomMsg: string;
  infraClientID: string;

  constructor(private randomMessageService: RandomMsgService, private infrastructure: InfrastructureService) {
  }

  ngOnInit() {
    this.randomMsg = this.randomMessageService.getMessage();
    this.infraClientID = this.infrastructure.infrastructureObject.clientID;
  }

}
