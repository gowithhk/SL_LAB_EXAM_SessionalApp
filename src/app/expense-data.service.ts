import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExpenseDataService {
  api_url = 'http://localhost:3000/api/expense/';
  expenseList = [];
  expenseObs = new Subject();

  constructor(private http: HttpClient) { }

  submit(desc :string, category_id :string, amount: number, date: Date) {
    const expenseItem = {
      desc: desc,
      category_id: category_id,
      amount: amount,
      date: date
    }
    this.http.post<any>(this.api_url, expenseItem)
      .subscribe(data => {
        this.expenseList.push(data);
        this.expenseObs.next([...this.expenseList])
        console.log(data);
      })
  }

  getList() {
    this.http.get<any>(this.api_url).subscribe(data => {
      this.expenseList = data;
      this.expenseObs.next([...this.expenseList]);
    })
  }

  getSubscription(): any {
    return this.expenseObs.asObservable();
  }

  delete(id) {
    this.http.delete(this.api_url + id).subscribe(data => {
      this.expenseList = this.expenseList.filter(item => item._id !== id);
      this.expenseObs.next([...this.expenseList]);
    })
  }

  forceReload() {
    this.getList();
    this.expenseObs.next([...this.expenseList]);
  }

}