import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../_services/CurrentUser.service';
import { CurrentUser } from '../models/CurrentUser.model';
import { LogoutTimer } from 'src/app/models/LogoutTimer.model';
import { LogoutTimerService } from 'src/app/_services/LogoutTimer.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  @Input() loggedIn: boolean;
  @Input() username: string = '';

  model: any = {};

  navName: string = 'LANDING PAGE';

  logoutTimerDisplay = false;

  logoutTimer: LogoutTimer = {
    logoutTimerID: 0,
    active: true,
    time: 5,
  };
  logoutTimers: LogoutTimer[] = [];

  currentUser: CurrentUser = null;
  currentUsers: CurrentUser[] = [];

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
    private ngZone: NgZone,
    private LogoutTimerService: LogoutTimerService
  ) {
    this.loggedIn = true;
  }

  ngOnInit() {
    this.getAllCurrentUsers();
    this.router.navigate(['/landing-page']);
    this.getLogoutTimers();
    this.lastAction(Date.now());
    this.check();
    this.initListener();
    this.initInterval();
  }

  getLastAction() {
    return localStorage.getItem('lastAction');
  }
  getLogoutTimers() {
    this.LogoutTimerService.getAllLogoutTimers().subscribe((res) => {
      this.logoutTimers = res;
      if (this.logoutTimers.length > 0)
        this.logoutTimer = this.logoutTimers[this.logoutTimers.length - 1];
      console.log('this is all the logout timers');
      console.log(this.logoutTimers);
    });
  }

  lastAction(value) {
    localStorage.setItem('lastAction', JSON.stringify(value));
  }
  initListener() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('click', () => this.reset());
      window.addEventListener('mousemove', () => this.reset());
      window.addEventListener('scroll', () => this.reset());
      window.addEventListener('keydown', () => this.reset());
      window.addEventListener('keyup', () => this.reset());
    });
  }
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000);
    });
  }
  reset() {
    this.lastAction(Date.now());
  }
  check() {
    const now = Date.now();
    const timeLeft =
      parseInt(this.getLastAction()) + this.logoutTimer.time * 60 * 1000;
    // console.log(timeLeft);
    const diff = timeLeft - now;
    const isTimeout = diff < 0;
    //this.isLoggedIn.subscribe(event => this.isLogin = event);
    this.ngZone.run(() => {
      if (isTimeout && this.logoutTimer.active) {
        localStorage.removeItem('lastAction');
        setTimeout(() => {
          console.log(
            'Your Session Expired due to longer Inactivity, Login Again To Continue'
          );
        }, 10000);
        window.location.reload();
      }
    });
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/app']);
    this.return.emit('false');
    this.getAllCurrentUsers();
  }

  setCurrentUser() {
    this.currentUser = this.currentUsers[this.currentUsers.length - 1];
    this.username = this.currentUser.username;
  }

  getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      this.setCurrentUser();
    });
  }

  updateLogout(timer) {
    console.log('timer from nav');
    console.log(timer);
  }
}
