import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationsService } from '../../services/operations.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import * as saveAs from 'file-saver';
import { BaseController } from '../../../../core/utils/base-controller';
import { SessionService } from '../../services/session.service';
import { convertBase64ToBlobForDownload, getObjectFromArray } from 'src/app/core/utils/utils';
import { Constants } from '../../../../core/utils/constants';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-order-processed',
  templateUrl: './order-processed.component.html'
})
export class OrderProcessedComponent extends BaseController implements OnInit, OnDestroy {

  statusElement: boolean = true;
  statusElement2: boolean = false;
  statusElement3: boolean = false;

  lstOrdProc: string[] = [];
  selOrdProc: string | undefined;

  lstOrdErr: string[] = [];
  selOrdErr: string | undefined;

  constructor(
    private opService: OperationsService,
    private primengConfig: PrimeNGConfig,
    private sessionService: SessionService,
    protected override messageService: MessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.processMultipleRequest();
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  processMultipleRequest() {
    forkJoin({
      ordPro: this.loadTableOrdPro(),
      ordErr: this.loadTableOrdErr()
    }).
      subscribe({
        next: ({ ordPro, ordErr }) => {
          // Se verifica que ambos servicios hayan responido status = 'OK'
          const status = ordPro.status == Constants.WS_OK_CPO && ordErr.status == Constants.WS_OK_CPO;
          if (status) {
            this.lstOrdProc = ["hola"];
            this.lstOrdErr = ["hola"];
          } else {
            if (ordPro.status == Constants.WS_OK_CPO) {
              this.lstOrdProc = ["hola"];
            } else {
              this.showMessage(ordPro.message, true);
            }
            if (ordErr.status == Constants.WS_OK_CPO) {
              this.lstOrdErr = ["hola"];
            } else {
              this.showMessage(ordErr.message, true);
            }
          }
          this.statusElement = !this.statusElement;
        }
      });
  }

  loadTableOrdPro() {
    return this.opService.listOrders(Constants.ID_ORDPC_ERICSSON_PROCESED).
      pipe(
        catchError(error => of({ message: getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_LIST_ORDER_PROCESS_ERROR).value }))
      )
  }

  loadTableOrdErr() {
    return this.opService.listOrders(Constants.ID_ORDPC_ERICSSON_ERROR).
      pipe(
        catchError(error => of({ message: getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_LIST_ORDER_ERROR_ERROR).value }))
      )
  }

  downloadFile(flag: number, fileName: string): void {
    this.controlSpinner(flag);
    let directory = (flag == 1) ? Constants.ID_ORDPC_ERICSSON_PROCESED : Constants.ID_ORDPC_ERICSSON_ERROR;
    this.opService.downloadOrder(directory, fileName).
      subscribe({
        next: (resp) => {
          if (resp.status == Constants.WS_OK_CPO) {
            saveAs(convertBase64ToBlobForDownload("77u/Q0FNUE8gMTtDQU1QTyAyO0NBTVBPIDM7Q0FNUE8gNDtDQU1QTyA1DQpBO0I7QztEO0UNCkY7RztIO0k7Sg0KSztMO007TjvDkQ0KTztQO1E7UjtTDQo="), fileName);
          } else {
            this.showMessage(resp.message, true);
          }
          this.controlSpinner(flag);
        },
        error: (err) => {
          console.log(err);
          this.showMessage(getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR).value, true);
          this.controlSpinner(flag);
        }
      })
  }

  private controlSpinner(flag: number) {
    if (flag == 1) {
      this.statusElement2 = !this.statusElement2;
    } else {
      this.statusElement3 = !this.statusElement3;
    }
  }
}
