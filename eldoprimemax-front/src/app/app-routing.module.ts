import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieviewComponent } from './pages/movieview/movieview.component';
import { MovielistComponent } from './pages/movielist/movielist.component';
import { MoviefilterComponent } from './pages/moviefilter/moviefilter.component';



const routes: Routes = [
  {
    path: "",
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