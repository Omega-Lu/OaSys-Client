import { Component, NgZone, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { LogoutTimer } from 'src/app/models/LogoutTimer.model';
import { LogoutTimerService } from 'src/app/_services/LogoutTimer.service';

@Component({
  selector: 'app-logout-timer',
  templateUrl: './logout-timer.component.html',
  styleUrls: ['./logout-timer.component.css'],
})
export class LogoutTimerComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<LogoutTimer>();

  time: number = 5;

  timerActive: boolean = true;

  successDelete: boolean = false;
  successEdit: boolean = false;
  successAdd: boolean = false;

  validTime: boolean = true;

  //use validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //logout timer model
  logoutTimer: LogoutTimer = {
    logoutTimerID: 0,
    active: true,
    time: 5,
  };
  logoutTimers: LogoutTimer[] = [];

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private LogoutTimerService: LogoutTimerService
  ) {
    this.getLogoutTimers();
    this.lastAction(Date.now());
    this.check();
    this.initListener();
    this.initInterval();
    this.timerActive = this.logoutTimer.active;
    this.time = this.logoutTimer.time;
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

  editLogoutTimer() {
    this.LogoutTimerService.getAllLogoutTimers().subscribe((res) => {
      if (res.length > 0) {
        this.logoutTimer = res[res.length - 1];
        this.logoutTimer.time = this.time;
        this.logoutTimer.active = true;
        this.LogoutTimerService.updateLogoutTimer(this.logoutTimer).subscribe(
          (res) => {
            console.log('this is the updated logout timer');
            console.log(res);
            this.newItemEvent.emit(this.logoutTimer);
          }
        );
      }
    });
  }

  addLogoutTimer() {
    this.logoutTimer.time = this.time;
    this.logoutTimer.active = true;
    if (this.logoutTimers.length < 1) {
      this.LogoutTimerService.addLogoutTimer(this.logoutTimer).subscribe(
        (res) => {
          console.log('this is the new logout timer');
          console.log(res);
          this.getLogoutTimers();
          this.newItemEvent.emit(this.logoutTimer);
          this.successAdd = false;
        }
      );
    } else {
      this.LogoutTimerService.updateLogoutTimer(this.logoutTimer).subscribe(
        (res) => {
          console.log('this is the updated logout timer');
          console.log(res);
          this.newItemEvent.emit(this.logoutTimer);
          this.successAdd = false;
        }
      );
    }
  }

  deleteLogoutTimer() {
    this.logoutTimer.active = false;
    if (this.logoutTimers.length < 1) {
    } else {
      this.LogoutTimerService.deleteLogoutTimer(
        this.logoutTimer.logoutTimerID
      ).subscribe((res) => {
        console.log('this is the deleted logout timer');
        console.log(res);
        this.newItemEvent.emit(this.logoutTimer);
      });
    }
  }

  ngOnInit(): void {}

  /**
   * last action
   */
  getLastAction() {
    return localStorage.getItem('lastAction');
  }

  /**
   * set last action
   * @param value
   */
  lastAction(value) {
    localStorage.setItem('lastAction', JSON.stringify(value));
  }

  /**
   * start event listener
   */
  initListener() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('click', () => this.reset());
      window.addEventListener('mousemove', () => this.reset());
      window.addEventListener('scroll', () => this.reset());
      window.addEventListener('keydown', () => this.reset());
      window.addEventListener('keyup', () => this.reset());
    });
  }

  /**
   * time interval
   */
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000);
    });
  }

  /**
   * reset timer
   */
  reset() {
    this.lastAction(Date.now());
  }

  /**
   * check timer
   */
  check() {
    const now = Date.now();
    const timeLeft =
      parseInt(this.getLastAction()) + this.logoutTimer.time * 60 * 1000;
    console.log(timeLeft);
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

  ValidateTime() {
    this.validTime = this.validate.ValidateMoney(this.time);
  }
}
