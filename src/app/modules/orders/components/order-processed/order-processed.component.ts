import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationsService } from '../../services/operations.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import * as saveAs from 'file-saver';
import { BaseController } from '../../../../core/utils/base-controller';
import { SessionService } from '../../../../core/services/session.service';
import { convertBase64ToBlobForDownload } from 'src/app/core/utils/utils';
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

  constructor(
    private primengConfig: PrimeNGConfig,
    private opService: OperationsService,
    sessionService: SessionService,
    messageService: MessageService
  ) {
    super(messageService, sessionService);
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
    return this.opService.listOrders(this.sessionService.ordpcDirEP, this.sessionService.timeOutList).
      pipe(
        catchError(error => of({ message: this.sessionService.ordpcCLOPE }))
      )
  }

  private loadTableOrdErr(): Observable<any | ListOrdersResponse> {
    return this.opService.listOrders(this.sessionService.ordpcDirEE, this.sessionService.timeOutList).
      pipe(
        catchError(error => of({ message: this.sessionService.ordpcCLOEE }))
      )
  }

  downloadFile(flag: number, fileName: string, index: number): void {
    this.controlSpinner(flag, index);
    const directory = (flag == 1) ? this.sessionService.ordpcDirEP : this.sessionService.ordpcDirEE;
    this.opService.downloadOrder(directory, fileName, this.sessionService.timeOutDownload).
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
          this.showMessage(this.sessionService.ordpcCDOE, true);
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
