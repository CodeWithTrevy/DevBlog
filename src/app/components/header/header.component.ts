import { Component, TemplateRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIfContext } from '@angular/common';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {



  constructor(public authService:AuthService, private router:Router){

  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}