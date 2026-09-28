import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
private authService=inject(Auth)
name=signal('')
department=signal('')

ngOnInit(): void {
    this.getUser();
}

getUser(){
  this.authService.getUser().subscribe({
  next: (user) => {
    console.log(user);
    this.name.set(user.user_metadata.name);
   
   this.department.set(user.user_metadata.department);
    console.log(this.name,this.department)
  },
  error: (error) => {
    console.error(error);
  }
});
}
}
