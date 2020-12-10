import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryDataService {
  api_url = 'http://localhost:3000/api/category/';
  categoryList = [];
  categoryObs = new Subject();

  constructor(private http: HttpClient) { }

  submit(name :string, threshold :number) {
    const categoryItem = {
      name: name,
      threshold :threshold
    }
    this.http.post<any>(this.api_url, categoryItem)
      .subscribe(data => {
        this.categoryList.push(data);
        this.categoryObs.next([...this.categoryList])
        console.log(data);
      })
  }

  getList() {
    this.http.get<any>(this.api_url).subscribe(data => {
      this.categoryList = data;
      this.categoryObs.next([...this.categoryList]);
    })
  }

  getSubscription(): any {
    return this.categoryObs.asObservable();
  }

  delete(id) {
    this.http.delete(this.api_url + id).subscribe(data => {
      this.categoryList = this.categoryList.filter(item => item._id !== id);
      this.categoryObs.next([...this.categoryList]);
    })
  }

  forceReload() {
    this.getList();
    this.categoryObs.next([...this.categoryList]);
  }

}