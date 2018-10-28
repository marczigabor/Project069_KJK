import { Component, OnInit } from '@angular/core';
import { KjkApiService } from '../shared/services/kjk-api.service';
import { Router } from '@angular/router';
import { Registration } from '../shared/model/registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  errors: string;  
  isRequesting: boolean;
  submitted: boolean = false;  
  
  constructor(
    private kjkService: KjkApiService,
    private router: Router    
  ) { }

  ngOnInit() {
  }

  registerUser({ value, valid }: { value: Registration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if(valid)
    {

      this.kjkService.register(value.email, value.userName, value.password,value.firstName,value.lastName)
      .subscribe( () => {
            this.router.navigate(['/login'],{queryParams: {brandNew: true, email:value.email}});                         
        },
        //error
        (errors) => { this.errors = errors }, //error handling
        // completed
        () => {}  );
    }      
 } 

}
