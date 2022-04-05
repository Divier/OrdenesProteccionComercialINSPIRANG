export class Constants {

  public static MIME_TYPE_CSV: string[] = [
    'text/comma-separated-values',
    'text/csv',
    'application/csv',
    'application/vnd.ms-excel'
  ];

  public static SIZE_FILE_CSV: number = 10485760;

  // Internal identifiers
  public static ID_STORAGE_PARAM_INFO: string = 'parametersInfo';
  public static ID_ORDPC_CLARO_LOADED: string = 'ORDPC_CLARO_LOADED';
  public static ID_ORDPC_ERICSSON_PROCESED: string = 'ORDPC_ERICSSON_PROCESED';
  public static ID_ORDPC_ERICSSON_ERROR: string = 'ORDPC_ERICSSON_ERROR';


  // Response OK Services
  public static WS_OK_GET_CONSTANTS = 'SUCCESS';
  public static WS_OK_CPO = 'OK';

  // Campos Header
  public static HEADER_TRANSACTION_ID: string = 'transactionId';

  // Mensajes Generales
  public static MSG_ERROR_READ_PARAMETERS: string = 'Ocurrio un problema al cargar los parametros de la aplicacion';
  public static MSG_ERROR_ZERO_PARAMETERS: string = 'No se cargo ningun parametro utilizado en la aplicacion';
  public static MSG_ERROR_FILE_SIZE: string = "El archivo seleccionado supera el tamaño permitido";
  public static MSG_ERROR_FILE_TYPE: string = "El archivo seleccionado no es del tipo permitido";

  // Parameters
  public static ORDPC_HEADER_FIELD_TRANSACTION_ID: string = 'ORDPC_HEADER_FIELD_TRANSACTION_ID';
  public static ORDPC_CONSUME_SENT_ORDER_ERROR: string = 'ORDPC_CONSUME_SENT_ORDER_ERROR';
  public static ORDPC_CONSUME_LIST_ORDER_LOAD_ERROR: string = 'ORDPC_CONSUME_LIST_ORDER_LOAD_ERROR';
  public static ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR: string = 'ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR';
  public static ORDPC_CONSUME_LIST_ORDER_PROCESS_ERROR: string = 'ORDPC_CONSUME_LIST_ORDER_PROCESS_ERROR';
  public static ORDPC_CONSUME_LIST_ORDER_ERROR_ERROR: string = 'ORDPC_CONSUME_LIST_ORDER_ERROR_ERROR';

  // Array of parameters
  public static REQUIRED_CONSTANTS: string[] = [
    Constants.ORDPC_HEADER_FIELD_TRANSACTION_ID,
    Constants.ORDPC_CONSUME_SENT_ORDER_ERROR,
    Constants.ORDPC_CONSUME_LIST_ORDER_LOAD_ERROR,
    Constants.ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR,
    Constants.ORDPC_CONSUME_LIST_ORDER_PROCESS_ERROR,
    Constants.ORDPC_CONSUME_LIST_ORDER_ERROR_ERROR,
  ];
}
