import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  HostListener,
  ElementRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { SearchService } from '../../core/services/search.service';
import { ShowDetailedInfoDTO } from '../users/models/show-detailed-info.dto';

import { searchTypes } from './constants/search-type';
import { PATHS } from 'src/app/common/constants/paths';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() public closeMenu: EventEmitter<null> = new EventEmitter();

  private readonly searchSubject$ = new Subject<string>();
  public searchInput = new FormControl();
  public searchSubscription: Subscription;
  public users: ShowDetailedInfoDTO[] = [];
  public searchType = searchTypes.USERS;
  public inputValue = '';
  public showDropdown = false;
  public showUsersResults = false;

  constructor(
    private readonly searchService: SearchService,
    private readonly eRef: ElementRef,
    private readonly router: Router
  ) {}

  /**
   * On initializing the component subscription to the search
   * subject is created in order to detect changes in the search input.
   */
  ngOnInit() {
    this.searchSubscription = this.searchSubjectAsObservable
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(searchInput => {
        if (this.searchType === searchTypes.USERS) {
          this.searchUsers(searchInput);
        } else {
          this.searchPosts(searchInput);
        }
      });
  }

  /**
   * Unsubscribing to all subscriptions in the component.
   */
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  /**
   * Listens if the user has clicked outside of the
   * search field in order to close the results.
   *
   * @param {Event} event - The click event by the user.
   */
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.toggleResults();
      this.clearInput();
      this.showDropdown = false;
    }
  }

  /**
   * Gets the search subject and return it as an Observable.
   *
   * @returns {Observable} - Search subject as observable.
   */
  public get searchSubjectAsObservable() {
    return this.searchSubject$.asObservable();
  }

  /**
   * Search by users by username ,subscribing to the search service.
   *
   * @param {string} username - The username to search by.
   */
  public searchUsers(username: string) {
    this.searchService.searchUsers(username).subscribe(res => {
      this.users = res;
    });
  }

  /**
   * Search posts by description.
   *
   * @param {string} description - The username to search by.
   */
  public searchPosts(description: string) {
    this.router.navigate([PATHS.SEARCH], {queryParams: {keyword: description}});
  }

  /**
   * Emits next value to the search subject.
   *
   * @param {string} username - The username to emit.
   */
  public emitToSubject(username: string) {
    this.searchSubject$.next(username);
  }

  /**
   * Hides search results
   */
  public toggleResults() {
    this.showUsersResults = false;
  }

  /**
   * Shows search results
   */
  public showResults() {
    this.showUsersResults = true;
  }

  /**
   * Close search results if there is no input.
   */
  public closeResults(input: string) {
    if (!input) {
      this.showUsersResults = false;
    }
  }

  /**
   * Clears the input value.
   */
  public clearInput() {
    this.inputValue = '';
  }

  /**
   * Close the navigation menu while on mobile.
   */
  public closeNav() {
    this.closeMenu.emit();
  }

  /**
   * Changes the type of the search.
   *
   * @param {searchTypes} - The type of searching.
   */
  public changeSearchType(type: searchTypes) {
    this.searchType = type;
  }

  /**
   * Shows or hides the menu with the search options.
   *
   */
  public toggleSearchMenu() {
    this.showDropdown = !this.showDropdown;
  }
}
