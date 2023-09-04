import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private formBuilder:FormBuilder,private authenticationService:AuthenticationService,private router:Router,
    private activatedRoute:ActivatedRoute) {
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
    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl: string = params["returnUrl"];
      if (returnUrl)
        this.router.navigateByUrl(returnUrl)
      else
        this.router.navigateByUrl("/")
    });
  }
}
