import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Constants } from 'src/app/core/utils/constants';
import { getObjectFromArray } from 'src/app/core/utils/utils';
import { GeneralService } from './general.service';
import { SessionService } from './session.service';
import { SentOrderResponse } from '../interfaces/sent-order-response.interface';
import { ListOrdersResponse } from '../interfaces/list-orders-response.interface';
import { DownloadOrderResponse } from '../interfaces/download-order-response.interface';

@Injectable({
  providedIn: 'root',
})
export class OperationsService extends GeneralService {

  urlSO = getObjectFromArray(this.sessionService.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_SEND).url;
  urlLO = getObjectFromArray(this.sessionService.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_LIST).url;
  urlDO = getObjectFromArray(this.sessionService.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_DOWNLOAD).url;

  constructor(
    http: HttpClient,
    private sessionService: SessionService
  ) {
    super(http);
  }

  sentOrder(request: any, timeOutSend?: number): Observable<any | SentOrderResponse> {
    const headers = {
      transactionId: getObjectFromArray(this.sessionService.getEnvInfo().constant, 'code', Constants.ORDPC_HEADER_FIELD_TRANSACTION_ID).value
    }
    return this.put(this.urlSO, [headers], request).
      pipe(
        timeout(timeOutSend! * 1000),
        map(this.getWsResponseCPO)
      );
  }

  listOrders(directory: string | undefined, timeOutList?: number): Observable<any | ListOrdersResponse> {
    return this.get(`${this.urlLO}?directory=${directory}`, []).
      pipe(
        timeout(timeOutList! * 1000),
        map(this.getWsResponseCPO)
      );
  }

  downloadOrder(directory: string | undefined, fileName: string, timeOutDownload?: number): Observable<any | DownloadOrderResponse> {
    return this.get(`${this.urlDO}?directory=${directory}&fileName=${fileName}`, []).
      pipe(
        timeout(timeOutDownload! * 1000),
        map(this.getWsResponseCPO)
      );
  }
}
