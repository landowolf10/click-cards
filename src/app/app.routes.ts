import { Routes } from '@angular/router';
import { PlacesCarousel } from './components/places-carousel/places-carousel';
import { PlaceDetail } from './components/place-detail/place-detail';
import { AboutUs } from './components/about-us/about-us';
import { Login } from './components/login/login';
import { GeneralDashboard } from './components/general-dashboard/general-dashboard';

export const routes: Routes = [
  { path: '', component: PlacesCarousel },
  { path: 'card/:id', component: PlaceDetail },
  { path: 'about-us', component: AboutUs },
  { path: 'login', component: Login },
  { path: 'admin/dashboard', component: GeneralDashboard },
];
