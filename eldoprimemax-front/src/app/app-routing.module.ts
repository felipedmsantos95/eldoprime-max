import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieviewComponent } from './pages/movieview/movieview.component';
import { MovielistComponent } from './pages/movielist/movielist.component';
import { MoviefilterComponent } from './pages/moviefilter/moviefilter.component';
import { LoginComponent } from './pages/login/login.component';




const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "movieslist",
    component: MovielistComponent,
  },
  {
    path: "category/:id",
    component: MoviefilterComponent,
  },
  {
    path: "movie/:id",
    component: MovieviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }