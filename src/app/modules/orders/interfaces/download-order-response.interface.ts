import { CommonResponse } from './common-response.interface';

export interface DownloadOrderResponse extends CommonResponse {
  file: string;
}
