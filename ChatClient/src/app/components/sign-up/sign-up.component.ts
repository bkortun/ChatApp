import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/userModels/token';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup
  token:Token

  constructor(private formBuilder: FormBuilder,private authenticationService:AuthenticationService,private router:Router) {
    this.signUpForm=formBuilder.group({
      username:[""],
      email:[""],
      password:[""],
      passwordRepeat:[""]
    })
  }



  ngOnInit(): void {

  }

  async onSubmit() {
    this.token=await this.authenticationService.signUp(this.signUpForm.value)
    if(this.token!=null){
      this.router.navigate(["/rooms"]);
    }
  }

}
