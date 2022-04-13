import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationsService } from '../../services/operations.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { saveAs } from 'file-saver';
import { BaseController } from '../../../../core/utils/base-controller';
import { convertBase64ToBlobForDownload, getObjectFromArray } from 'src/app/core/utils/utils';
import { SessionService } from '../../services/session.service';
import { Constants } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-order-sent',
  templateUrl: './order-sent.component.html'
})
export class OrderSentComponent extends BaseController implements OnInit, OnDestroy {

  statusElement: boolean = true;
  statusElement2: boolean[] = [];

  lstOrdSent: string[] = [];
  selOrdSent: string | undefined;

  msgErrorOrderLoad: string = Constants.MSG_ERROR_ORDER_LOAD;

  ordpcCL?: string;
  ordpcCLOLE?: string;
  ordpcCDOE?: string;

  constructor(
    private opService: OperationsService,
    private sessionService: SessionService,
    private primengConfig: PrimeNGConfig,
    protected override messageService: MessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.ordpcCL = getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CLARO_LOADED).value;
    this.ordpcCLOLE = getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_LIST_ORDER_LOAD_ERROR).value;
    this.ordpcCDOE = getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR).value;
    this.loadTableOrdLoa();
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  private loadTableOrdLoa(): void {
    this.opService.listOrders(this.ordpcCL).
      subscribe({
        next: (resp) => {
          if (resp.status == Constants.WS_OK_CPO) {
            this.lstOrdSent = resp.data.files;
            this.statusElement2 = new Array(this.lstOrdSent.length);
          } else {
            this.showMessage(resp.message, true);
          }
          this.statusElement = !this.statusElement;
        },
        error: (err) => {
          console.log(err);
          this.showMessage(this.ordpcCLOLE, true);
          this.statusElement = !this.statusElement;
        }
      })
  }

  downloadFile(fileName: string, index: number): void {
    this.statusElement2[index] = true;
    this.opService.downloadOrder(this.ordpcCL, fileName).
      subscribe({
        next: (resp) => {
          if (resp.status == Constants.WS_OK_CPO) {
            saveAs(convertBase64ToBlobForDownload(resp.data.file), fileName);
          } else {
            this.showMessage(resp.message, true);
          }
          this.statusElement2[index] = false;
        },
        error: (err) => {
          console.log(err);
          this.showMessage(this.ordpcCDOE, true);
          this.statusElement2[index] = false;
        }
      })
  }
}
