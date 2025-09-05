import { Routes } from '@angular/router';
import { PlacesCarousel } from './components/places-carousel/places-carousel';
import { PlaceDetail } from './components/place-detail/place-detail';
import { AboutUs } from './components/about-us/about-us';
import { Login } from './components/login/login';
import { GeneralDashboard } from './components/general-dashboard/general-dashboard';
import { PlacesByCategory } from './components/places-by-category/places-by-category';
import { ClientDetail } from './components/client-detail/client-detail';
import { MapLocation } from './components/map-location/map-location';
import { AssociatedList } from './components/associated-list/associated-list';
import { SelectedUserDashboard } from './components/selected-user-dashboard/selected-user-dashboard';
import { BackInfo } from './components/back-info/back-info';

export const routes: Routes = [
  { path: '', component: PlacesCarousel },
  { path: 'card/:id', component: PlaceDetail },
  { path: 'about-us', component: AboutUs },
  { path: 'login', component: Login },
  { path: 'admin/dashboard', component: GeneralDashboard },
  { path: 'places/:owner_id/:category', component: PlacesByCategory },
  { path: 'place/:cardId', component: ClientDetail },
  { path: 'map/:id', component: MapLocation },
  { path: 'associates', component: AssociatedList },
  { path: 'user-dashboard', component: SelectedUserDashboard },
  { path: 'back-info/:cardId', component: BackInfo },
];
