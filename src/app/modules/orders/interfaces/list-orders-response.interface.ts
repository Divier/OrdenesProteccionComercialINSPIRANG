import { CommonResponse } from './common-response.interface';

export interface ListOrdersResponse extends CommonResponse {
  files: string[];
}
