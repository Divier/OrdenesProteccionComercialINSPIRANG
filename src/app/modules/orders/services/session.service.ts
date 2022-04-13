import { Injectable } from '@angular/core';
import { EnvironmentInfo } from 'src/app/core/models/environment-info';
import { Constants } from 'src/app/core/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getEnvInfo(): EnvironmentInfo {
    const envInfo = sessionStorage.getItem(Constants.ID_STORAGE_PARAM_INFO);
    return (envInfo) ? <EnvironmentInfo>JSON.parse(envInfo) : {} as EnvironmentInfo;
  }

  setEnvInfo(envInfo: EnvironmentInfo): void {
    sessionStorage.setItem(Constants.ID_STORAGE_PARAM_INFO, JSON.stringify(envInfo));
  }
}
