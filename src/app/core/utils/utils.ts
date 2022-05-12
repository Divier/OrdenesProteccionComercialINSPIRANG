import { Constants } from './constants';
import { FileUpload } from 'primeng/fileupload';

export const getObjectFromArray = (parameters: any[], parameter: string, value: string) => {
  return parameters.find(item => item[parameter] == value);
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

export function procesar(reader: FileReader, fileUpload: FileUpload) {
  let cursor = 0;
  let row = 1;
  let group = 1;
  let arrLines: string[] = [];
  let lines = (reader.result as string).split(/\r?\n/);
  lines.forEach(function (line) {
    if (cursor != 0) {
      if (row <= 2) {
        arrLines.push(`${line}\n`);
      }
      if (row == 2) {
        let arrLinesWithHead = [`${lines[0]}\n`, ...arrLines];
        var file = new File(arrLinesWithHead, `filename_${group}.csv`, { type: "text/csv" });
        fileUpload._files.push(file);
        row = 1;
        ++group;
        arrLines = [];
      } else {
        ++row;
      }
    }
    ++cursor;
  })
}
