import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetConstantsResponse } from 'src/app/core/interfaces/parameter.interface';
import { GetWebServicesResponse } from 'src/app/core/interfaces/services.ext.interface';
import { Constants } from 'src/app/core/utils/constants';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService extends GeneralService {

  urlEndPointParameters = environment.api.base_url_ws_params + environment.api.base_operation_ws_params_getConstants;
  urlEndPointServices = environment.api.base_url_ws_params + environment.api.base_operation_ws_services_getWebServices;

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  getParameters(): Observable<any | GetConstantsResponse> {
    const data = { trace: true, data: [...Constants.REQUIRED_CONSTANTS] }
    return this.put(this.urlEndPointParameters, [], data).
      pipe(
        map(this.getWsResponse)
      );
  }

  getServices(): Observable<any | GetWebServicesResponse> {
    const data = { trace: true, data: [...Constants.REQUIRED_SERVICES] }
    //console.log(data);
    return this.put(this.urlEndPointServices, [], data).
      pipe(
        map(this.getWsResponse)
      );
  }
}
