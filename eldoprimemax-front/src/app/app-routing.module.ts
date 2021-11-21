import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieviewComponent } from './movieview/movieview.component';
import { MovielistComponent } from './movielist/movielist.component';
const routes: Routes = [
  {
    path: "",
    component: MovielistComponent,
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
