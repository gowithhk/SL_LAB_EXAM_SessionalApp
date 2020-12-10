import { Component, OnInit } from '@angular/core';
import { ExpenseDataService } from '../expense-data.service'

@Component({
  selector: 'app-daily-list',
  templateUrl: './daily-list.component.html',
  styleUrls: ['./daily-list.component.css']
})
export class DailyListComponent implements OnInit {
  public subscription;
  public expenseList;
  constructor(
    private fbService: ExpenseDataService // inject service
  ) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  ngOnInit(): void {
    this.subscription = this.fbService.getSubscription().subscribe(msg => {
      this.expenseList = msg;
    });
    this.fbService.forceReload();
  }

}
