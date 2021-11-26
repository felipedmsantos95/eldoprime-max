import { HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

import { environment } from "../../../environments/environment"


@Component({
  selector: "app-movielist",
  templateUrl: "./movielist.component.html",
  styleUrls: ["./movielist.component.css"],
})
export class MovielistComponent implements OnInit {
  movies = [];
  @ViewChild("modal") modal!: TemplateRef<any>;
  @ViewChild("vc", { read: ViewContainerRef }) vc!: ViewContainerRef;
  vRef: any = null;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchMovies();
  }
  ngAfterViewInit() {
    this.vRef = this.vc;
  }
  fetchMovies() {
    this.http
      .get(`${environment.baseApiUrl}/movies`)
      .subscribe((data: any) => {
        this.movies = data.data
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
