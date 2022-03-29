import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../../services/operations.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-processed',
  templateUrl: './order-processed.component.html',
  providers: [MessageService]
})
export class OrderProcessedComponent implements OnInit {

  lstOrdProc: Order[] = [
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },{
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    }
  ];
  selOrdProc: Order | undefined;

  lstOrdErr: Order[] = [
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },{
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    },
    {
      fileName:'archivoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.csv',
      resultValidation:'Descargar'
    }
  ];
  selOrdErr: Order | undefined;

  constructor(
    private opService: OperationsService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  downloadFile(): void {
    this.messageService.add({ severity: 'info', summary: '', detail: 'Archivo Descargado !!!' });
  }
}
