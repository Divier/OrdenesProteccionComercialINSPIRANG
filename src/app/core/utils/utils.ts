import { Constants } from './constants';
export const getObjectFromArray = (array: any[], parameter: string, value: string) => {
  return array.find(item => item[parameter] == value);
}

export function convertBase64ToBlobForDownload(base64: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: Constants.MIME_TYPE_CSV[1] });
}
