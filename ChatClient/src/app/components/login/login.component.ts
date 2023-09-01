import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/userModels/token';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  token:Token

  constructor(private formBuilder:FormBuilder,private authenticationService:AuthenticationService,private router:Router) {
    this.loginForm=formBuilder.group({
      email:[""],
      password:[""]
    })
  }

  ngOnInit(): void {
  }

  async onSubmit(){
    this.token= await this.authenticationService.login(this.loginForm.value)
    console.log(this.token)
    localStorage.setItem("token",this.token.authToken)
    if(this.token!=null){
      this.router.navigate(["/rooms"]);
    }
  }
}
