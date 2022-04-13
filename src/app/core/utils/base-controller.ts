import { MessageService } from "primeng/api";
import { interval, Subscription } from "rxjs";
import { getObjectFromArray } from "./utils";
import { SessionService } from '../../modules/orders/services/session.service';
import { Constants } from "./constants";

export class BaseController {

  protected subscription!: Subscription;
  protected timeOutSend?: number;
  protected timeOutList?: number;
  protected timeOutDownload?: number;

  constructor(
    protected messageService: MessageService,
    protected sessionService: SessionService,
  ) {
    this.timeOutSend = getObjectFromArray(this.sessionService.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_SEND).timeOut;
    this.timeOutList = getObjectFromArray(this.sessionService.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_LIST).timeOut;
    this.timeOutDownload = getObjectFromArray(this.sessionService.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_DOWNLOAD).timeOut;
  }

  private setTimeViewMessage(): void {
    this.subscription = interval(1000).
      subscribe(second => {
        if (second == 3) {
          this.messageService.clear();
        }
      });
  }

  showMessage(message: string | undefined, autoHide: boolean): void {
    if (message) {
      this.messageService.add({ severity: 'info', summary: '', detail: message });
      if (autoHide) {
        this.setTimeViewMessage();
      }
    }
  }
}
