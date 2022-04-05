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
  statusElement2: boolean = false;

  lstOrdSent: string[] = [];
  selOrdSent: string | undefined;

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
    this.loadTableOrdLoa();
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  loadTableOrdLoa() {
    this.opService.listOrders('Constants.ID_ORDPC_CLARO_LOADED').
      subscribe({
        next: (resp) => {
          if (resp.status == Constants.WS_OK_CPO) {
            this.lstOrdSent = ["Hola"];
          } else {
            this.showMessage(resp.message, true);
          }
          this.statusElement = !this.statusElement;
        },
        error: (err) => {
          console.log(err);
          this.showMessage(getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_LIST_ORDER_ERROR).value, true);
          this.statusElement = !this.statusElement;
        }
      })
  }

  downloadFile(fileName: string): void {
    this.statusElement2 = !this.statusElement2;
    this.opService.downloadOrder(Constants.ID_ORDPC_CLARO_LOADED, fileName).
      subscribe({
        next: (resp) => {
          if (resp.status == Constants.WS_OK_CPO) {
            saveAs(convertBase64ToBlobForDownload("77u/Q0FNUE8gMTtDQU1QTyAyO0NBTVBPIDM7Q0FNUE8gNDtDQU1QTyA1DQpBO0I7QztEO0UNCkY7RztIO0k7Sg0KSztMO007TjvDkQ0KTztQO1E7UjtTDQo="), fileName);
          } else {
            this.showMessage(resp.message, true);
          }
          this.statusElement2 = !this.statusElement2;
        },
        error: (err) => {
          console.log(err);
          this.showMessage(getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR).value, true);
          this.statusElement2 = !this.statusElement2;
        }
      })
  }
}
