import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../../services/parameters.service';
import { SessionService } from '../../services/session.service';
import { BaseController } from '../../../../core/utils/base-controller';
import { MessageService } from 'primeng/api';
import { Constants } from '../../../../core/utils/constants';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { GetConstantsResponse } from 'src/app/core/interfaces/parameter.interface';
import { GetWebServicesResponse } from 'src/app/core/interfaces/services.ext.interface';
import { EnvironmentInfo } from 'src/app/core/models/environment-info';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent extends BaseController implements OnInit {

  statusElement: boolean = true;
  viewPrincipal: boolean = false;

  enabled0: boolean = true;
  enabled1: boolean = false;
  enabled2: boolean = false;

  constructor(
    private paramService: ParametersService,
    sessionService: SessionService,
    messageService: MessageService
  ) {
    super(messageService, sessionService);
  }

  ngOnInit(): void {
    this.processMultipleRequest();
  }

  private processMultipleRequest() {
    forkJoin({
      param: this.getParamInfo(),
      ws: this.getWSInfo()
    }).
      subscribe({
        next: ({ param, ws }) => {
          const status = param.status && ws.status;
          if (status) {
            const { getConstantsResponse: constant } = param.data;
            const { getWebServicesResponse: service } = ws.data;
            if (constant.length == Constants.REQUIRED_CONSTANTS.length
              && service.length == Constants.REQUIRED_SERVICES.length) {
              this.sessionService.setEnvInfo(new EnvironmentInfo({ constant, service }));
              this.viewPrincipal = true;
            } else {
              this.showMessage(Constants.MSG_ERROR_INCOMPLETE_PARAMETERS_AND_SERVICES, false);
            }
          } else {
            if (!param.status) {
              this.showMessage(param.message, false);
            }
            if (!ws.status) {
              this.showMessage(ws.message, false);
            }
          }
          this.statusElement = !this.statusElement;
        }
      });
  }

  private getParamInfo(): Observable<any | GetConstantsResponse> {
    return this.paramService.getParameters().
      pipe(
        catchError(error => of({ message: Constants.MSG_ERROR_READ_PARAMETERS }))
      )
  }

  private getWSInfo(): Observable<any | GetWebServicesResponse> {
    return this.paramService.getServices().
      pipe(
        catchError(error => of({ message: Constants.MSG_ERROR_READ_SERVICES }))
      )
  }

  /*private getParamInfo() {
    this.paramService.getParameters().
      subscribe({
        next: (resp) => {
          if (resp.status) {
            const { getConstantsResponse: constant } = resp.data;
            if (constant.length > 0) {
              this.sessionService.setParamInfo(constant);
              this.viewPrincipal = true;
            } else {
              this.showMessage(Constants.MSG_ERROR_ZERO_PARAMETERS, false);
            }
          }
          this.statusElement = !this.statusElement;
        },
        error: () => {
          this.showMessage(Constants.MSG_ERROR_READ_PARAMETERS, false);
          this.statusElement = !this.statusElement;
        }
      })
  }

  private getWSInfo() {
    this.paramService.getServices().
      subscribe({
        next: (resp) => {
          if (resp.status) {
            const { getWebServicesResponse: constant } = resp.data;
            if (constant.length > 0) {
              this.sessionService.setWSInfo(constant);
              this.viewPrincipal = true;
            } else {
              this.showMessage(Constants.MSG_ERROR_ZERO_PARAMETERS, false);
            }
          }
          this.statusElement = !this.statusElement;
        },
        error: () => {
          this.showMessage(Constants.MSG_ERROR_READ_PARAMETERS, false);
          this.statusElement = !this.statusElement;
        }
      })
  }*/

  handleChange(e: any) {
    switch (e.index) {
      case 0: {
        this.enabled0 = true;
        this.enabled1 = false;
        this.enabled2 = false;
        break;
      }
      case 1: {
        this.enabled0 = false;
        this.enabled1 = true;
        this.enabled2 = false;
        break;
      }
      case 2: {
        this.enabled0 = false;
        this.enabled1 = false;
        this.enabled2 = true;
        break;
      }
      default:
        break;
    }
  }
}
