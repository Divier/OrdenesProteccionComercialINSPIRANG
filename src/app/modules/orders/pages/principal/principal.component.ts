import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../../services/parameters.service';
import { SessionService } from '../../services/session.service';
import { BaseController } from '../../../../core/utils/base-controller';
import { MessageService } from 'primeng/api';
import { Constants } from '../../../../core/utils/constants';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent extends BaseController implements OnInit {

  statusElement: boolean = true;

  enabled0: boolean = true;
  enabled1: boolean = false;
  enabled2: boolean = false;

  constructor(
    private paramService: ParametersService,
    private sessionService: SessionService,
    messageService: MessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.getParamInfo();
  }

  getParamInfo() {
    this.paramService.getParameters().
      subscribe({
        next: (resp) => {
          if (resp.status) {
            const { getConstantsResponse: constant } = resp.data;
            if (constant.length > 0) {
              this.sessionService.setParamInfo(constant);
            } else {
              this.showMessage(Constants.MSG_ERROR_ZERO_PARAMETERS);
            }
          }
          this.statusElement = !this.statusElement;
        },
        error: () => {
          this.showMessage(Constants.MSG_ERROR_READ_PARAMETERS);
          this.statusElement = !this.statusElement;
        }
      })
  }

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
