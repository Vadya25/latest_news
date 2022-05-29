import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { INews } from '../models/news.module';
import { NewsService } from '../news.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  subscription: Subscription
  newsList: Array<INews>

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.getNewsFromServer();
  }

  getNewsFromServer(): void {
    this.subscription = this.newsService.getNews().subscribe(res => {
      this.newsList = res.articles;
      console.log(res)
    });
  }

  openNews(url: string): void {
    Browser.open({ url: url })
  }

  searchInput($event: any): void {

    const query = $event.target.value.toLowerCase();
    const items = Array.from(document.querySelector('ion-list').children);
    
    requestAnimationFrame(() => {
      items.forEach((item: any) => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
