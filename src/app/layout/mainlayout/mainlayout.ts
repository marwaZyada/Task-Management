import { Component, OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Taskly } from '../../shared/components/taskly/taskly';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mainlayout',
  imports: [Navbar, Sidebar, RouterOutlet, Taskly, CommonModule],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.css',
})
export class Mainlayout implements OnInit {
  menuclicked = false;
  isIcon = false;

  ngOnInit(): void {
    this.menuclicked = false;
    console.log('m', this.menuclicked);
    console.log('iconshow', this.isIcon);
  }
  changeValue() {
    this.menuclicked = true;
  }
}
