import { HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

import { ActivatedRoute, Params, Router } from "@angular/router";


import { environment } from "../../../environments/environment"


@Component({
  selector: "app-moviefilter",
  templateUrl: "./moviefilter.component.html",
  styleUrls: ["./moviefilter.component.css"],
})
export class MoviefilterComponent implements OnInit {
  movies = [];
  
  @ViewChild("modal") modal!: TemplateRef<any>;
  @ViewChild("vc", { read: ViewContainerRef }) vc!: ViewContainerRef;
  vRef: any = null;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchMovies()
  }
  ngAfterViewInit() {
    this.vRef = this.vc;
  }
  fetchMovies() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        const movieId = params.id;
        this.http
          .get(`${environment.baseApiUrl}/movies/${movieId}`)
          .subscribe((data: any) => (this.movies = data.data));
      }
    });
  }
  showAddMovieDialog() {
    let view = this.modal.createEmbeddedView(null);
    this.vRef.insert(view);
  }
  closeDialog() {
    this.vRef.clear();
  }
}
