import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { Menu } from './components/menu/menu';
import { RouterModule } from '@angular/router';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    HttpClientModule,
    HammerModule,
    RouterModule,
    Menu,
    Footer
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('click-cards');
}
