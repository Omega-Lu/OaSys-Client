import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;

  navName: string = 'LANDING PAGE';

  constructor(private router: Router) {
    this.loggedIn = true;
  }

  ngOnInit(): void {
    this.router.navigate(['/landing-page']);
  }

  logout() {
    this.loggedIn = false;
  }
}
