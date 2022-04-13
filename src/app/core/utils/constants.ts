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

  // Response OK Services
  public static WS_OK_GET_CONSTANTS_AND_SERVICES = 'SUCCESS';
  public static WS_OK_CPO = 'OK';

  // Campos Header
  public static HEADER_TRANSACTION_ID: string = 'transactionId';

  // Mensajes Generales
  public static MSG_ERROR_READ_PARAMETERS: string = 'Ocurrio un problema al cargar los parametros de la aplicacion';
  public static MSG_ERROR_READ_SERVICES: string = 'Ocurrio un problema al cargar los servicios de la aplicacion';
  public static MSG_ERROR_INCOMPLETE_PARAMETERS_AND_SERVICES: string = 'No se cargo toda la configuracion requerida por la aplicacion';
  public static MSG_ERROR_FILE_SIZE: string = "El archivo seleccionado supera el tamaño permitido";
  public static MSG_ERROR_FILE_TYPE: string = "El archivo seleccionado no es del tipo permitido";
  public static MSG_ERROR_ORDER_LOAD: string = "Sin registros para mostrar con relacion a ordenes cargadas";
  public static MSG_ERROR_ORDER_PROCESSED: string = "Sin registros para mostrar con relacion a ordenes procesadas";
  public static MSG_ERROR_ORDER_ERROR: string = "Sin registros para mostrar con relacion a ordenes con error";
  public static MSG_ERROR_ORDER_PROCESSED_AND_ERROR: string = "Sin registros para mostrar con relacion a ordenes procesadas y ordenes con error";

  // Parameters
  public static ORDPC_HEADER_FIELD_TRANSACTION_ID: string = 'ORDPC_HEADER_FIELD_TRANSACTION_ID';
  public static ORDPC_CONSUME_SENT_ORDER_ERROR: string = 'ORDPC_CONSUME_SENT_ORDER_ERROR';
  public static ORDPC_CONSUME_LIST_ORDER_LOAD_ERROR: string = 'ORDPC_CONSUME_LIST_ORDER_LOAD_ERROR';
  public static ORDPC_CONSUME_LIST_ORDER_PROCESS_ERROR: string = 'ORDPC_CONSUME_LIST_ORDER_PROCESS_ERROR';
  public static ORDPC_CONSUME_LIST_ORDER_ERROR_ERROR: string = 'ORDPC_CONSUME_LIST_ORDER_ERROR_ERROR';
  public static ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR: string = 'ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR';
  public static ORDPC_OPC_DIRID_CLARO_AUDIT: string = 'ORDPC_OPC_DIRID_CLARO_AUDIT';
  public static ORDPC_OPC_DIRID_ERICSSON_PROCESSED: string = 'ORDPC_OPC_DIRID_ERICSSON_PROCESSED';
  public static ORDPC_OPC_DIRID_ERICSSON_ERROR: string = 'ORDPC_OPC_DIRID_ERICSSON_ERROR';

  // Array of parameters
  public static REQUIRED_CONSTANTS: string[] = [
    Constants.ORDPC_HEADER_FIELD_TRANSACTION_ID,
    Constants.ORDPC_CONSUME_SENT_ORDER_ERROR,
    Constants.ORDPC_CONSUME_LIST_ORDER_LOAD_ERROR,
    Constants.ORDPC_CONSUME_LIST_ORDER_PROCESS_ERROR,
    Constants.ORDPC_CONSUME_LIST_ORDER_ERROR_ERROR,
    Constants.ORDPC_CONSUME_DOWNLOAD_ORDER_ERROR,
    Constants.ORDPC_OPC_DIRID_CLARO_AUDIT,
    Constants.ORDPC_OPC_DIRID_ERICSSON_PROCESSED,
    Constants.ORDPC_OPC_DIRID_ERICSSON_ERROR
  ];

  // Services
  public static WS_ORDPC_COMERCIAL_PROTECTION_ORDER_SEND: string = 'WS_ORDPC_COMERCIAL_PROTECTION_ORDER_SEND';
  public static WS_ORDPC_COMERCIAL_PROTECTION_ORDER_LIST: string = 'WS_ORDPC_COMERCIAL_PROTECTION_ORDER_LIST';
  public static WS_ORDPC_COMERCIAL_PROTECTION_ORDER_DOWNLOAD: string = 'WS_ORDPC_COMERCIAL_PROTECTION_ORDER_DOWNLOAD';

  // Array of services
  public static REQUIRED_SERVICES: string[] = [
    Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_SEND,
    Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_LIST,
    Constants.WS_ORDPC_COMERCIAL_PROTECTION_ORDER_DOWNLOAD
  ];
}
