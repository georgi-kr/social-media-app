import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { DialogService } from '../../core/services/dialog.service';
import { ConformationDialogBoxComponent } from '../../shared/conformation-dialog-box/conformation-dialog-box.component';
import { User } from '../users/models/user';
import { PATHS } from 'src/app/common/constants/paths';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  public readonly PATHS = PATHS;
  public username: string;
  public loggedIn = false;
  public isAdmin = false;
  public showHamMenu = false;

  constructor(
    private readonly authService: AuthService,
    private readonly dialog: DialogService
  ) {}

  /**
   * On initializing the component checks if any user is logged in and get his data.
   */
  ngOnInit() {
    this.userSubscription = this.authService.loggedUser$.subscribe(
      (user: User) => {
        if (user) {
          this.isAdmin = user.isAdmin;
          this.username = user.username;
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );
  }

  /**
   * Unsubscribing all subscriptions in the component.
   */
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  /**
   * Gets the user profile link.
   */
  public get profileLink() {
    return [PATHS.USERS, this.username];
  }

  /**
   * On logout click pop a conformation dialog box, on approval logout by the authService,
   * otherwise nothing happens.
   */
  public logout() {
    const confirmData = {
      description: 'Do you want to logout?',
    };
    const refDialog = this.dialog.openConfDialog(
      ConformationDialogBoxComponent,
      confirmData
    );

    refDialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.authService.logout();
      }
    });
  }

  /**
   * Shows and hides hamburger menu, used for smaller device.
   */
  public toggleHam() {
    this.showHamMenu = !this.showHamMenu;
  }
}
