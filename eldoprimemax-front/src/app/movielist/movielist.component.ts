import { HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
@Component({
  selector: "app-movielist",
  template: `
    <div class="movielist-cnt">
      <div class="movielist-breadcrumb">
        <div>
          <h2>Catálogo de Filmes</h2>
        </div>
        <div>
          <button
            class="btn"
            style="padding-left: 15px;padding-right: 15px;font-weight: 500;"
            (click)="showAddMovieDialog()"
          >
           Adicionar Filme
          </button>
        </div>
      </div>
      <div class="movielist">
        <app-moviecard
          *ngFor="let movie of movies"
          [movie]="movie"
        ></app-moviecard>
      </div>
      <ng-container #vc></ng-container>
      <ng-template #modal>
        <app-addmovie
          (closeDialog)="closeDialog()"
          (refreshMovies)="fetchMovies()"
        ></app-addmovie>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .movielist {
        display: flex;
        color: grey;
        padding: 15px;
        flex-wrap: wrap;
        padding-top: 0;
      }
      .movielist-breadcrumb {
        font-family: system-ui;
        display: flex;
        justify-content: space-between;
        padding: 32px;
        padding-bottom: 0;
        padding-top: 17px;
      }
      .movielist-breadcrumb h2 {
        margin: 0;
      }
    `,
  ],
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
      .get("http://localhost:3001/movies")
      .subscribe((data: any) => {
        console.log(data)
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
