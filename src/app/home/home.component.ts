import { Component, OnInit } from '@angular/core';
import { DataUserService } from '../data-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   h1Style: boolean = false;
   users: Object;
   constructor(private data: DataUserService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    }
   );
  }

  firstClick() {
    console.log('clicked');
  }

}
