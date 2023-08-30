import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private testService:TestService,private route: ActivatedRoute) { }
  roomName:string
  ngOnInit(): void {

  }

  test(){
    this.testService.getData().subscribe(
      response => {
        this.testService = response;
        console.log(this.testService); // Gelen veriyi konsolda görüntüle
      },
      error => {
        console.error('Error fetching data:', error);
      })
  }

}
