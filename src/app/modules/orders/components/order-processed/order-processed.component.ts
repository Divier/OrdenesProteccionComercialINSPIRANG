import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationsService } from '../../services/operations.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import * as saveAs from 'file-saver';
import { BaseController } from '../../../../core/utils/base-controller';
import { SessionService } from '../../services/session.service';
import { convertBase64ToBlobForDownload, getObjectFromArray } from 'src/app/core/utils/utils';
import { Constants } from '../../../../core/utils/constants';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { ListOrdersResponse } from '../../interfaces/list-orders-response.interface';

@Component({
  selector: 'app-order-processed',
  templateUrl: './order-processed.component.html'
})
export class OrderProcessedComponent extends BaseController implements OnInit, OnDestroy {

  statusElement: boolean = true;
  statusElement2: boolean[] = [];
  statusElement3: boolean[] = [];

  lstOrdProc: string[] = [];
  selOrdProc: string | undefined;

  lstOrdErr: string[] = [];
  selOrdErr: string | undefined;

  msgErrorOrderProcess: string = Constants.MSG_ERROR_ORDER_PROCESSED;
  msgErrorOrderError: string = Constants.MSG_ERROR_ORDER_ERROR;
  msgErrorOrderProcessAndError: string = Constants.MSG_ERROR_ORDER_PROCESSED_AND_ERROR;

  ordpcEP?: string;
  ordpcEE?: string;
  ordpcCDOE?: string;
  ordpcCLOPE?: string;
  ordpcCLOEE?: string;

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
    this.ordpcEP = getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_ERICSSON_PROCESED).value;
    this.ordpcEE = getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_ERICSSON_ERROR).value;
    this.ordpcCDOE = getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR).value;
    this.ordpcCLOPE = getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_LIST_ORDER_PROCESS_ERROR).value;
    this.ordpcCLOEE = getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_CONSUME_LIST_ORDER_ERROR_ERROR).value;
    this.processMultipleRequest();
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  private processMultipleRequest(): void {
    forkJoin({
      ordPro: this.loadTableOrdPro(),
      ordErr: this.loadTableOrdErr()
    }).
      subscribe({
        next: ({ ordPro, ordErr }) => {
          // Se verifica que ambos servicios hayan responido status = 'OK'
          const status = ordPro.status == Constants.WS_OK_CPO && ordErr.status == Constants.WS_OK_CPO;
          if (status) {
            this.lstOrdProc = ordPro.data.files;
            this.lstOrdErr = ordErr.data.files;
            this.statusElement2 = new Array(this.lstOrdProc.length);
            this.statusElement3 = new Array(this.lstOrdErr.length);
          } else {
            if (ordPro.status == Constants.WS_OK_CPO) {
              this.lstOrdProc = ordPro.data.files;
              this.statusElement2 = new Array(this.lstOrdProc.length);
            } else {
              this.showMessage(ordPro.message, true);
            }
            if (ordErr.status == Constants.WS_OK_CPO) {
              this.lstOrdErr = ordErr.data.files;
              this.statusElement3 = new Array(this.lstOrdErr.length);
            } else {
              this.showMessage(ordErr.message, true);
            }
          }
          this.statusElement = !this.statusElement;
        }
      });
  }

  private loadTableOrdPro(): Observable<any | ListOrdersResponse> {
    return this.opService.listOrders(this.ordpcEP).
      pipe(
        catchError(error => of({ message: this.ordpcCLOPE }))
      )
  }

  private loadTableOrdErr(): Observable<any | ListOrdersResponse> {
    return this.opService.listOrders(this.ordpcEE).
      pipe(
        catchError(error => of({ message: this.ordpcCLOEE }))
      )
  }

  downloadFile(flag: number, fileName: string, index: number): void {
    this.controlSpinner(flag, index);
    let directory = (flag == 1) ? this.ordpcEP : this.ordpcEE;
    this.opService.downloadOrder(directory, fileName).
      subscribe({
        next: (resp) => {
          if (resp.status == Constants.WS_OK_CPO) {
            saveAs(convertBase64ToBlobForDownload(resp.data.file), fileName);
          } else {
            this.showMessage(resp.message, true);
          }
          this.controlSpinner(flag, index);
        },
        error: (err) => {
          console.log(err);
          this.showMessage(this.ordpcCDOE, true);
          this.controlSpinner(flag, index);
        }
      })
  }

  private controlSpinner(flag: number, index: number): void {
    if (flag == 1) {
      this.statusElement2[index] = !this.statusElement2[index];
    } else {
      this.statusElement3[index] = !this.statusElement3[index];
    }
  }
}
