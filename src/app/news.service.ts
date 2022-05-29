import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INews } from './models/news.module';

export type newsResponse = {
  status: string,
  totalResults: number, 
  articles: Array<INews>
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<newsResponse> {
    return this.http.get<any>('https://newsapi.org/v2/top-headlines?country=ua&apiKey=aea73da55a5d4b889d1814bbd43bd6c8');
  }

}
