// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    base_url_ws_params: 'http://100.126.0.150:11053/',
    base_operation_ws_params_getConstants: 'MCA-LoginSessionRest/ws/getConstants',
    base_operation_ws_services_getWebServices: 'MCA-LoginSessionRest/ws/getWebServices',

    base_url_ws_cpo: 'http://100.126.19.106:7002/',
    base_operation_ws_cpo_sentOrder: 'ComercialProtectionOrder/V1.0/Rest/sentOrder',
    base_operation_ws_cpo_listOrders: 'ComercialProtectionOrder/V1.0/Rest/listOrders',
    base_operation_ws_cpo_downloadOrder: 'ComercialProtectionOrder/V1.0/Rest/downloadOrder'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
