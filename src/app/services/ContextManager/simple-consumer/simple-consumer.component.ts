import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContextManagerService} from '../ContextManager.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-simple-consumer',
  templateUrl: './simple-consumer.component.html',
  styleUrls: ['./simple-consumer.component.css']
})
export class SimpleConsumerComponent implements OnInit, OnDestroy {
  contextData: string;

  constructor(private contextManager: ContextManagerService) {

  }

  ngOnInit() {
    const contexts = this.contextManager.getContextObservables();
    if (contexts.length > 0) {
      const firstContext = contexts[0];
      firstContext.pipe(takeUntil(componentDestroyed(this))).subscribe((context) => {
        this.contextData = context.extraData;
      });
    }
  }

  ngOnDestroy(): void {
  }
}
