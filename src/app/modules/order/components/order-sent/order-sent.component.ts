import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../../services/operations.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Order } from '../../interfaces/order.interface';
import { saveAs } from 'file-saver';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-order-sent',
  templateUrl: './order-sent.component.html',
  providers: [MessageService]
})
export class OrderSentComponent implements OnInit {

  lstOrdSent: Order[] = [
    {
      fileName:'salida.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida1.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida2.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida3.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida4.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida5.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida6.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida7.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida8.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida9.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'salida10.csv',
      resultValidation:'Descargar'
    }
  ];
  selOrdSent: Order | undefined;

  constructor(
    private opService: OperationsService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  downloadFile(fileName: string): void {
    this.opService.getFile(fileName).subscribe((resp: any) => {
      let blob:any = new Blob([resp], { type: 'application/octet-stream; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			saveAs(blob, fileName);
    },(error: any) => {
      this.messageService.add({ severity: 'info', summary: '', detail: 'Archivo No Existe !!!' });
    });
  }
}
