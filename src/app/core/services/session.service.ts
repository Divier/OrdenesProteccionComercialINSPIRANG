import { Injectable } from '@angular/core';
import { EnvironmentInfo } from 'src/app/core/models/environment-info';
import { Constants } from 'src/app/core/utils/constants';
import { getObjectFromArray } from 'src/app/core/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  ordpcDirCL?: string;
  ordpcCLOLE?: string;
  ordpcCDOE?: string;
  ordpcDirEP?: string;
  ordpcDirEE?: string;
  ordpcCLOPE?: string;
  ordpcCLOEE?: string;
  ordpcCSOE?: string;

  urlSO?: string;
  urlLO?: string;
  urlDO?: string;
  timeOutSend?: number;
  timeOutList?: number;
  timeOutDownload?: number;

  constructor() { }

  getEnvInfo(): EnvironmentInfo {
    const envInfo = sessionStorage.getItem(Constants.ID_STORAGE_PARAM_INFO);
    return (envInfo) ? <EnvironmentInfo>JSON.parse(envInfo) : {} as EnvironmentInfo;
  }

  setEnvInfo(envInfo: EnvironmentInfo): void {
    sessionStorage.setItem(Constants.ID_STORAGE_PARAM_INFO, JSON.stringify(envInfo));
  }

  loadEnvConfiguration(): void {
    this.ordpcDirCL = getObjectFromArray(this.getEnvInfo().constant, 'code', Constants.ORDPC_OPC_DIRID_CLARO_AUDIT).value;
    this.ordpcCLOLE = getObjectFromArray(this.getEnvInfo().constant, 'code', Constants.ORDPC_CONSUME_LIST_ORDER_LOAD_ERROR).value;
    this.ordpcDirEP = getObjectFromArray(this.getEnvInfo().constant, 'code', Constants.ORDPC_OPC_DIRID_ERICSSON_PROCESSED).value;
    this.ordpcDirEE = getObjectFromArray(this.getEnvInfo().constant, 'code', Constants.ORDPC_OPC_DIRID_ERICSSON_ERROR).value;
    this.ordpcCDOE = getObjectFromArray(this.getEnvInfo().constant, 'code', Constants.ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR).value;
    this.ordpcCLOPE = getObjectFromArray(this.getEnvInfo().constant, 'code', Constants.ORDPC_CONSUME_LIST_ORDER_PROCESS_ERROR).value;
    this.ordpcCLOEE = getObjectFromArray(this.getEnvInfo().constant, 'code', Constants.ORDPC_CONSUME_LIST_ORDER_ERROR_ERROR).value;
    this.ordpcCSOE = getObjectFromArray(this.getEnvInfo().constant, 'code', Constants.ORDPC_CONSUME_SENT_ORDER_ERROR).value;

    this.urlSO = getObjectFromArray(this.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_SEND).url;
    this.urlLO = getObjectFromArray(this.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_LIST).url;
    this.urlDO = getObjectFromArray(this.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_DOWNLOAD).url;
    this.timeOutSend = getObjectFromArray(this.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_SEND).timeOut;
    this.timeOutList = getObjectFromArray(this.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_LIST).timeOut;
    this.timeOutDownload = getObjectFromArray(this.getEnvInfo().service, 'name', Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_DOWNLOAD).timeOut;
  }
}
