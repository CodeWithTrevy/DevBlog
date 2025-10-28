import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    imports: []
})
export class HomePageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
    console.log('Home Page Loaded');
  }

}
