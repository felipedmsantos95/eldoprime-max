import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
@Component({
  selector: "app-movieview",
  template: `
    <div class="movieview-container">
      <div class="movieview">
        <div
          class="movieview-image"
          style="background-image: url({{ movie?.full_path }});"
        ></div>
        <div class="movieview-details">
          <div class="movieview-name">
            <h1>{{ movie?.name }} ({{ formatDate(movie?.year_release).getFullYear() }})</h1>
          </div>
          <div style="padding: 5px 0;">
            <span>
              <button
                style="margin-left: 0;"
                class="btn"
                (click)="showEditMovieDialog()"
              >
                Editar
              </button>
              <button class="btn btn-danger" (click)="deleteMovie()">
                Remover
              </button>
            </span>
          </div>
          <div style="padding: 5px 0;">
            <span> Gênero: {{ movie?.category.name }}</span>
          </div>
          <div style="padding: 5px 0;">
            <span>Data de Lançamento: {{ formatDate(movie?.year_release).toLocaleDateString() }}</span>
          </div>
          <div class="movieview-synopsis-cnt">
            <h2>Sinopse</h2>
            <div class="movie-synopsis">{{ movie?.synopsis }}</div>
          </div>
        </div>
      </div>
      <ng-container #vcRef></ng-container>
      <ng-template #modalRef>
        <app-editmovie
          (closeDialog)="closeDialog()"
          [movie]="movie"
        ></app-editmovie>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .movieview-container {
        display: flex;
        justify-content: center;
      }
      .movieview {
        display: flex;
        justify-content: center;
        padding: 15px;
        width: 900px;
      }
      .movieview-image {
        height: 500px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        margin-right: 10px;
        padding-right: 15px;
        flex: 5;
      }
      .movieview-details {
        font-family: system-ui;
        padding-left: 15px;
        flex: 7;
      }
      .movieview-name h1 {
        margin-top: 0;
        border-top: 1px solid;
        border-bottom: 1px solid;
        padding: 10px 0;
      }
      .movieview-synopsis-cnt h2 {
        border-bottom: 1px solid;
        padding-bottom: 4px;
      }
    `,
  ],
})
export class MovieviewComponent implements OnInit {
  movie: any;
  @ViewChild("modalRef") modalRef!: TemplateRef<any>;
  @ViewChild("vcRef", { read: ViewContainerRef }) vcRef!: ViewContainerRef;
  vRef: any = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  formatDate(date: any){
    let splitedDate = date.split(/[- : T Z]/);
    return new Date(Date.UTC(splitedDate[0], splitedDate[1]-1, splitedDate[2], splitedDate[3], splitedDate[4]))
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        const movieId = params.id;
        this.http
          .get("http://localhost:3001/movie/" + movieId)
          .subscribe((data: any) => (this.movie = data.data));
      }
    });
  }
  deleteMovie() {
    if (confirm("Tem certeza que deseja remover este filme?")) {
      this.http
        .delete("http://localhost:3001/movie/" + this.movie?.id)
        .subscribe((data) => {
          this.router.navigate(["/"]);
        });
    }
  }
  showEditMovieDialog() {
    let view = this.modalRef.createEmbeddedView(null);
    this.vcRef.insert(view);
  }
  closeDialog() {
    this.vcRef.clear();
  }
}