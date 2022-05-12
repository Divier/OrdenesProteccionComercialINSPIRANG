import { MessageService } from "primeng/api";
import { interval, Subscription } from "rxjs";
import { SessionService } from '../services/session.service';
import { Constants } from './constants';

export class BaseController {

  protected subscription!: Subscription;

  constructor(
    protected messageService: MessageService,
    protected sessionService: SessionService,
  ) { }

  private setTimeViewMessage(): void {
    this.subscription = interval(1000).
      subscribe(second => {
        if (second == Constants.SECONDS_TO_SEE_MESSAGES) {
          this.messageService.clear();
        }
      });
  }

  protected showMessage(message: string | undefined, autoHide: boolean): void {
    if (message) {
      this.messageService.add({ severity: 'info', summary: '', detail: message });
      if (autoHide) {
        this.setTimeViewMessage();
      }
    }
  }
}
