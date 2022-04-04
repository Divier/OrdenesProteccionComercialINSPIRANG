import { Injectable } from '@angular/core';
import { GetConstantResponseElement } from 'src/app/core/interfaces/parameter.interface';
import { Constants } from 'src/app/core/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  environmentInfo!: GetConstantResponseElement;

  constructor() { }

  getParamInfo(): GetConstantResponseElement | any {
    const paramInfo = sessionStorage.getItem(Constants.ID_STORAGE_PARAM_INFO);
    return (paramInfo) ? <GetConstantResponseElement>JSON.parse(paramInfo) : {} as GetConstantResponseElement;
  }

  setParamInfo(paramInfo: GetConstantResponseElement[]): void {
    sessionStorage.setItem(Constants.ID_STORAGE_PARAM_INFO, JSON.stringify(paramInfo));
  }
}
