import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  userEmail: string = '';
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthService) { }



  ngOnInit(): void {
    // console.log(JSON.parse(localStorage.getItem('user')).email);
    const userString = localStorage.getItem('user');
    let user;

    if (userString !== null) {
      user = JSON.parse(userString);
    } else {
      // Handle the case when 'user' is null
      // For example, you can assign a default value to 'user'
      user = {};
    }

    this.userEmail = user.email;

    this.isLoggedIn$ =  this.authService.isLoggedIn();
  }

  onLogOut(){
    this.authService.logOut();
  }

}
