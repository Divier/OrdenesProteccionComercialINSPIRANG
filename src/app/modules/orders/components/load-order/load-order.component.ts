import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { OperationsService } from '../../services/operations.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Constants } from '../../../../core/utils/constants';
import { BaseController } from '../../../../core/utils/base-controller';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-load-order',
  templateUrl: './load-order.component.html'
})
export class LoadOrderComponent extends BaseController implements OnInit, OnDestroy {

  statusElement: boolean = false;

  fileUpload!: FileUpload | undefined;
  file: File | undefined;
  fileName!: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private opService: OperationsService,
    sessionService: SessionService,
    messageService: MessageService
  ) {
    super(messageService, sessionService);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  uploadHandler(fileUpload: FileUpload): void {
    this.fileUpload = fileUpload;
    if (this.fileUpload) {
      if (this.validateFileUpload()) {
        this.fileName = this.fileUpload._files[0].name;
      } else {
        this.removeFile();
      }
    }
  }

  removeFile(): void {
    this.fileUpload?.clear();
    this.fileUpload = undefined;
    this.fileName = '';
  }

  sendFile(): void {
    this.statusElement = !this.statusElement;
    const reader = new FileReader();
    reader.readAsDataURL(this.fileUpload!._files[0] as Blob);
    reader.onloadend = () => {
      let base64: string = reader.result as string;
      Constants.MIME_TYPE_CSV.forEach(element => {
        base64 = base64.replace(`data:${element};base64,`, '');
      });
      console.log(base64);
      this.opService.sentOrder({ 'file': base64 }, this.sessionService.timeOutSend).
        subscribe({
          next: (resp) => {
            this.showMessage(resp.message, true);
            this.statusElement = !this.statusElement;
            this.removeFile();
          },
          error: (err) => {
            console.log(err);
            this.showMessage(this.sessionService.ordpcCSOE, true);
            this.statusElement = !this.statusElement;
            this.removeFile();
          }
        })
    }
  };

  private validateFileUpload(): boolean {
    const fileSize: number = this.fileUpload!._files[0].size;
    const fileType: string = this.fileUpload!._files[0].type;

    if (fileSize > Constants.SIZE_FILE_CSV) {
      this.showMessage(Constants.MSG_ERROR_FILE_SIZE, true);
      return false;
    }
    if (!Constants.MIME_TYPE_CSV.includes(fileType)) {
      this.showMessage(Constants.MSG_ERROR_FILE_TYPE, true)
      return false;
    }
    return true;
  }
}
