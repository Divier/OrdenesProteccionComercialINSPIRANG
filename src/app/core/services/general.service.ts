import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetConstantsResponse } from 'src/app/core/interfaces/parameter.interface';
import { Constants } from '../utils/constants';
import { SentOrderResponse } from '../../modules/orders/interfaces/sent-order-response.interface';
import { ListOrdersResponse } from '../../modules/orders/interfaces/list-orders-response.interface';
import { DownloadOrderResponse } from '../../modules/orders/interfaces/download-order-response.interface';
import { GetWebServicesResponse } from '../interfaces/services-ext.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    protected http: HttpClient,
  ) { }

  private getHeader() {
    const h = {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8'
    }
    return new HttpHeaders(h);
  }

  private addHeader(arrHeaders: any[]): HttpHeaders {
    let headers = this.getHeader();
    if (arrHeaders.length > 0) {
      arrHeaders.forEach(element => {
        const { transactionId } = element;
        headers = (transactionId) ? headers.append(Constants.HEADER_TRANSACTION_ID, transactionId) : headers;
      });
    }
    return headers;
  }

  public get(url: string, arrHeaders: any[]): Observable<any> {
    const headers = this.addHeader(arrHeaders);
    return this.http.get(url, { headers })
  }

  public post(url: string, params: any, arrHeaders: any[]): Observable<any> {
    const headers = this.addHeader(arrHeaders);
    const body = JSON.stringify(params);
    return this.http.post(url, body, { headers })
  }

  public put(url: string, arrHeaders: any[], params?: any): Observable<any> {
    const headers = this.addHeader(arrHeaders);
    const body = params && JSON.stringify(params);
    return this.http.put(url, params && body, { headers })
  }

  /**
   * Permite modificar la respuesta del servicio ComercialProtectionOrder
   * @param res respuesta del servicio
   * @returns objeto cons la estructura {status: boolean, data: Object}
   */
  public getWsResponseCPO(response: SentOrderResponse | ListOrdersResponse | DownloadOrderResponse) {
    const { code, message, status } = response;
    if (status == Constants.WS_OK_CPO) {
      return { code: code, message: message, status: status, data: { ...response } }
    }
    return {
      code: code,
      message: message,
      status: status
    };
  }

  /**
   * Permite modificar la respuesta del servicio GetConstants
   * @param res respuesta del servicio
   * @returns objeto cons la estructura {status: boolean, data: Object}
   */
  public getWsResponse(res: GetConstantsResponse | GetWebServicesResponse) {
    const { response } = res;
    if (response.result == Constants.WS_OK_GET_CONSTANTS_AND_SERVICES) {
      return { status: true, data: { ...res } }
    }
    return {
      status: false,
      data: {
        error:
        {
          ...response
        }
      }
    };
  }
}
