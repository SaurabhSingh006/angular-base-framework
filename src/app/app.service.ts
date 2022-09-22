import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  showHamburgerMenuOnDesktopView: boolean = false;
  sidebarStatus$ = new BehaviorSubject(true);

  constructor(private http: HttpClient) {}

}
