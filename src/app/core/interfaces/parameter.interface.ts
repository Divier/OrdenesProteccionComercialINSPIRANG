export interface GetConstantsResponse {
  type: string;
  version: string;
  response: Response;
  getConstantsResponse: GetConstantResponseElement[];
}

export interface GetConstantResponseElement {
  code: string;
  value: string;
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
  title?: string;
}
