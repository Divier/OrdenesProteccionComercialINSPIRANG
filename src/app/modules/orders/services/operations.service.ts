import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from 'src/app/core/utils/constants';
import { getObjectFromArray } from 'src/app/core/utils/utils';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';
import { SessionService } from './session.service';
import { SentOrderResponse } from '../interfaces/sent-order-response.interface';
import { ListOrdersResponse } from '../interfaces/list-orders-response.interface';

@Injectable({
  providedIn: 'root',
})
export class OperationsService extends GeneralService {

  urlSO = environment.api.base_url_ws_cpo + environment.api.base_operation_ws_cpo_sentOrder;
  urlLO = environment.api.base_url_ws_cpo + environment.api.base_operation_ws_cpo_listOrders;
  urlDO = environment.api.base_url_ws_cpo + environment.api.base_operation_ws_cpo_downloadOrder;

  constructor(
    http: HttpClient,
    private sessionService: SessionService
  ) {
    super(http);
  }

  sentOrder(request: any): Observable<any | SentOrderResponse> {
    const headers = {
      transactionId: getObjectFromArray(this.sessionService.getParamInfo(), 'code', Constants.ORDPC_HEADER_FIELD_TRANSACTION_ID).value
    }
    return this.put(this.urlSO, [headers], request).
      pipe(
        map(this.getWsResponseCPO)
      );
  }

  listOrders(directory: string): Observable<any | ListOrdersResponse> {
    return this.get(`${this.urlLO}?directory=${directory}`, []).
      pipe(
        map(this.getWsResponseCPO)
      );
  }

  listOrders2(directory: string): Observable<any> {
    return this.get('http://localhost:8080/uploadFileBase64', []).
      pipe(
        map(this.getWsResponseCPO)
      );
  }

  downloadOrder(directory: string, fileName: string) {
    return this.get(`${this.urlDO}?directory=${directory}&fileName=${fileName}`, []).
      pipe(
        map(this.getWsResponseCPO)
      );
  }
}
