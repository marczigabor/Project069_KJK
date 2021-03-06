import { Component, OnInit } from '@angular/core';
import { KjkApiService } from '../shared/services/kjk-api.service';
import { LoginModel } from '../shared/model/LoginModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  errors: string;  
  loginModel: LoginModel;
  brandNew: boolean;
  isRequesting: boolean;

  constructor(
    private kjkService: KjkApiService,
    private router: Router   
  ) {
    this.loginModel = new LoginModel();
   }

  ngOnInit() {
  }

  login({ value, valid }: { value: LoginModel, valid: boolean }) : any{

    if (valid) {

      this.kjkService.login(value.userName, value.password)
        .subscribe( () => {
            this.router.navigate(['/books']);                         
        },
        //error
        (errors) => { this.errors = errors }, //error handling
        // completed
        () => {}  
      );
    }
  }
}
