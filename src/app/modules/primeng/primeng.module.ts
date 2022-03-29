import { NgModule } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [],
  exports: [
    TabViewModule,
    FileUploadModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    RippleModule,
    TableModule,
    CardModule
  ]
})
export class PrimengModule { }
