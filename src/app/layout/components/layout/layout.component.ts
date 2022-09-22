import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  //Sidenav Properties
  showHamburgerMenuOnDesktopView: boolean = false;
  sidenavStatus: any;

  //Mobile Width
  mobileQuery: any;
  _mobileQueryListener: any;

  constructor(
    private appService: AppService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router
  ) {}

  ngOnInit() {
    this.showHamburgerMenuOnDesktopView = this.appService.showHamburgerMenuOnDesktopView;
    //Updating the state using behaviour subject
    this.appService.sidebarStatus$.subscribe(
      (status) => (this.sidenavStatus = status)
    );

    //Code here for knowing whether the screen is mobile or desktop
    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => {
      //Open sidenav for desktop
      if (!this.mobileQuery.matches) {
        this.appService.sidebarStatus$.next(true);
      }

      return this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onMenuClick() {
    this.appService.sidebarStatus$.next(!this.sidenavStatus);
  }

  onSidenavLinkClick() {
    if (this.mobileQuery.matches) {
      this.appService.sidebarStatus$.next(false);
    }
  }

  handleLogout() {
    localStorage.setItem('token', '');
    this.router.navigateByUrl('/');
  }

}
