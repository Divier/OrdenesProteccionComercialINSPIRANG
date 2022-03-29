import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  token: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient){}

  ngOnInit(): void {
    this.route.queryParams.subscribe( ( {token} ) => {
      this.token = token;
      console.log(token);
    });
  }

  onClickSubmit() {

    /*const formData = new FormData();
    formData.append('token', this.token!);

    this.httpClient.post('/cargue', formData).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    );*/
  }
}
