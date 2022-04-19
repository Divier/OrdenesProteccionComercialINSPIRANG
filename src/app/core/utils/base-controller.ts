import { MessageService } from "primeng/api";
import { interval, Subscription } from "rxjs";
import { SessionService } from '../services/session.service';

export class BaseController {

  protected subscription!: Subscription;

  constructor(
    protected messageService: MessageService,
    protected sessionService: SessionService,
  ) { }

  private setTimeViewMessage(): void {
    this.subscription = interval(1000).
      subscribe(second => {
        if (second == 3) {
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
