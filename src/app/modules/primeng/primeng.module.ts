import { NgModule } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  exports: [
    TabViewModule,
    FileUploadModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    RippleModule,
    TableModule,
    CardModule,
    DividerModule,
    ProgressSpinnerModule
  ]
})
export class PrimengModule { }
