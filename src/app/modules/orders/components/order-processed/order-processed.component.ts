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
          } else if (ordPro.status == Constants.WS_OK_CPO) {
            this.lstOrdProc = ["hola"];
          } else if (ordErr.status == Constants.WS_OK_CPO) {
            this.lstOrdErr = ["hola"];
          }
          //console.log(ordPro);
          //console.log(ordErr);
          this.statusElement = !this.statusElement;
        }
      });
  }

  loadTableOrdPro() {
    return this.opService.listOrders(Constants.ID_ORDPC_ERICSSON_PROCESED).
      pipe(
        catchError(error => of(error))
      )
  }

  loadTableOrdErr() {
    return this.opService.listOrders(Constants.ID_ORDPC_ERICSSON_ERROR).
      pipe(
        catchError(error => of(error))
      )
  }

  downloadFile(flag: number, fileName: string): void {
    let directory = (flag == 1) ? Constants.ID_ORDPC_ERICSSON_PROCESED : Constants.ID_ORDPC_ERICSSON_ERROR;
    this.opService.downloadOrder(directory, fileName).
      subscribe({
        next: (resp) => {
          console.log(resp);
          saveAs(convertBase64ToBlobForDownload("77u/Q0FNUE8gMTtDQU1QTyAyO0NBTVBPIDM7Q0FNUE8gNDtDQU1QTyA1DQpBO0I7QztEO0UNCkY7RztIO0k7Sg0KSztMO007TjvDkQ0KTztQO1E7UjtTDQo="), fileName);
        },
        error: (err) => {
          console.log(err);
          this.showMessage(getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.DOWNLOAD_ORDER_ERROR).value, true);
        }
      })
  }
}
