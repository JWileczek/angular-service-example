import {Component, OnInit} from '@angular/core';
import {RandomMsgService} from '../../services/random-message.service';
import {StorageService} from '../../services/Storage/storage.service';

@Component({
  selector: 'app-singleton-msg',
  templateUrl: './singleton-msg.component.html',
  styleUrls: ['./singleton-msg.component.css'],
  providers: []
})
export class SingletonMsgComponent implements OnInit {

  private randomMsg = 'No Message from Service';
  private storageMsg: any;

  constructor(private storage: StorageService,
              private randomMsgService: RandomMsgService) {
  }

  ngOnInit() {
    this.storageMsg = this.storage.getItem(null);
    this.randomMsg = this.randomMsgService.getMessage();
  }

}
