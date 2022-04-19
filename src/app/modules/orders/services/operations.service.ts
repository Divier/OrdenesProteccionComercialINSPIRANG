import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Constants } from 'src/app/core/utils/constants';
import { getObjectFromArray } from 'src/app/core/utils/utils';
import { GeneralService } from '../../../core/services/general.service';
import { SessionService } from '../../../core/services/session.service';
import { SentOrderResponse } from '../interfaces/sent-order-response.interface';
import { ListOrdersResponse } from '../interfaces/list-orders-response.interface';
import { DownloadOrderResponse } from '../interfaces/download-order-response.interface';

@Injectable({
  providedIn: 'root',
})
export class OperationsService extends GeneralService {

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
    return this.put(this.sessionService.urlSO!, [headers], request).
      pipe(
        timeout(timeOutSend! * 1000),
        map(this.getWsResponseCPO)
      );
  }

  listOrders(directory: string | undefined, timeOutList?: number): Observable<any | ListOrdersResponse> {
    return this.get(`${this.sessionService.urlLO}?directory=${directory}`, []).
      pipe(
        timeout(timeOutList! * 1000),
        map(this.getWsResponseCPO)
      );
  }

  downloadOrder(directory: string | undefined, fileName: string, timeOutDownload?: number): Observable<any | DownloadOrderResponse> {
    return this.get(`${this.sessionService.urlDO}?directory=${directory}&fileName=${fileName}`, []).
      pipe(
        timeout(timeOutDownload! * 1000),
        map(this.getWsResponseCPO)
      );
  }
}
