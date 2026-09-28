import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
private authService=inject(Auth)
name=''
department=''

ngOnInit(): void {
    this.getUser();
}

getUser(){
  this.authService.getUser().subscribe({
  next: (user) => {
    console.log(user);
    this.name= user.user_metadata.name;
   this.department= user.user_metadata.department;
  },
  error: (error) => {
    console.error(error);
  }
});
}
}
