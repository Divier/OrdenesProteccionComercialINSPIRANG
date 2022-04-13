export const environment = {
  production: true,
  api: {
    base_url_ws_params: 'http://100.126.0.150:22052/',
    base_operation_ws_params_getConstants: 'MCA-LoginSessionRest/ws/getConstants',
    base_operation_ws_services_getWebServices: 'MCA-LoginSessionRest/ws/getWebServices',

    base_url_ws_cpo: 'http://100.126.19.106:7002/',
    base_operation_ws_cpo_sentOrder: 'ComercialProtectionOrder/V1.0/Rest/sentOrder',
    base_operation_ws_cpo_listOrders: 'ComercialProtectionOrder/V1.0/Rest/listOrders',
    base_operation_ws_cpo_downloadOrder: 'ComercialProtectionOrder/V1.0/Rest/downloadOrder'
  }
};
