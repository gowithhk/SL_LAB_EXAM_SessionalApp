import { Component, OnInit } from '@angular/core';
import { CategoryDataService } from '../category-data.service'
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public subscription;
  public categoryList;
  constructor(
    private fbService: CategoryDataService // inject service
  ) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  ngOnInit(): void {
    this.subscription = this.fbService.getSubscription().subscribe(msg => {
      this.categoryList = msg;
    });
    this.fbService.forceReload();
  }
}
