import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetConstantsResponse } from 'src/app/core/interfaces/parameter.interface';
import { Constants } from 'src/app/core/utils/constants';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService extends GeneralService {

  urlWS = environment.api.base_url_ws_params + environment.api.base_operation_ws_params_getConstants;

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  getParameters(): Observable<any | GetConstantsResponse> {
    const data = { trace: true, data: [...Constants.REQUIRED_CONSTANTS] }
    return this.put(this.urlWS, [], data).
      pipe(
        map(this.getWsResponseGetConstants)
      );
  }
}
