export interface GetWebServicesResponse {
  type: string;
  version: string;
  response: Response;
  getWebServicesResponse: GetWebServiceResponseElement[];
}

export interface GetWebServiceResponseElement {
  name: string;
  url: string;
  timeOut: number;
}

export interface Response {
  result: string;
  type: string;
  code: string;
  description: string;
  action: string;
  step: string;
  clase: string;
  line: string;
  detail: string;
}
