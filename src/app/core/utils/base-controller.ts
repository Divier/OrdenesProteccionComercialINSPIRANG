import { MessageService } from "primeng/api";
import { interval, Subscription } from "rxjs";

export class BaseController {

  protected subscription!: Subscription;

  constructor(protected messageService: MessageService) { }

  private setTimeViewMessage() {
    this.subscription = interval(1000).
      subscribe(second => {
        if (second == 3) {
          this.messageService.clear();
        }
      });
  }

  showMessage(message: string) {
    this.messageService.add({ severity: 'info', summary: '', detail: message });
    this.setTimeViewMessage();
  }
}
