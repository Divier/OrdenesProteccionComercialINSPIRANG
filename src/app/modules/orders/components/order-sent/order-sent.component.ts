import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationsService } from '../../services/operations.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { saveAs } from 'file-saver';
import { BaseController } from '../../../../core/utils/base-controller';
import { convertBase64ToBlobForDownload } from 'src/app/core/utils/utils';
import { SessionService } from '../../../../core/services/session.service';
import { Constants } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-order-sent',
  templateUrl: './order-sent.component.html'
})
export class OrderSentComponent extends BaseController implements OnInit, OnDestroy {

  statusLoadTable: boolean = true;
  statusElement2: boolean[] = [];

  _lstOrdSentOriginal: string[] = [];
  _lstOrdSentAux: string[] = [];
  selOrdSent: string | undefined;

  msgErrorOrderLoad: string = Constants.MSG_ERROR_ORDER_LOAD;

  get lstOrdSent() {
    return [...this._lstOrdSentAux];
  }

  set lstOrdSent(lista: string[]) {
    this._lstOrdSentAux = lista;
  }

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
    this.loadTableOrdLoa();
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  downloadFile(fileName: string, index: number): void {
    this.statusElement2[index] = true;
    this.opService.downloadOrder(this.sessionService.ordpcDirCL, fileName, this.sessionService.timeOutDownload).
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
          this.showMessage(this.sessionService.ordpcCDOE, true);
          this.statusElement2[index] = false;
        }
      })
  }

  setFilteredList(filteredList: string[]) {
    this.lstOrdSent = filteredList;
  }

  private loadTableOrdLoa(): void {
    this.opService.listOrders(this.sessionService.ordpcDirCL, this.sessionService.timeOutList).
      subscribe({
        next: (resp) => {
          if (resp.status == Constants.WS_OK_CPO) {
            this._lstOrdSentAux = resp.data.files;
            this._lstOrdSentOriginal = resp.data.files;
            this.statusElement2 = new Array(this.lstOrdSent.length);
          } else {
            this.showMessage(resp.message, true);
          }
          this.statusLoadTable = !this.statusLoadTable;
        },
        error: (err) => {
          console.log(err);
          this.showMessage(this.sessionService.ordpcCLOLE, true);
          this.statusLoadTable = !this.statusLoadTable;
        }
      })
  }
}
