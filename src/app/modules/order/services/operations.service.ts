import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { Constants } from 'src/app/core/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient) { }

  uploadFile(fileUpload: FileUpload) {
    const reader = new FileReader();
    reader.readAsDataURL(fileUpload._files[0] as Blob);
    reader.onloadend = () => {
      var base64: string = reader.result as string;
      Constants.MIME_TYPE_CSV.forEach(element => {
        base64 = base64.replace(`data:${element};base64,`, '');
      });

      const formData: FormData = new FormData();
      formData.append("encodeFile", base64);
      return this.http.post("http://localhost:8080/uploadFileBase64", formData)
        .subscribe(resp => {
          console.log(resp);
        });
    };
  }

  getFile(fileName: string): any {
    const url = "http://localhost:8080/downloadFile";
    return this.http.get(`${url}/${fileName}`, {responseType: "blob"});
  }
}
