import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

import {formatDate,getYear} from "../../utils"
@Component({
  selector: "app-movieview",
  templateUrl:  "./movieview.component.html",
  styleUrls: [ "./movieview.component.css"],
})
export class MovieviewComponent implements OnInit {
  movie: any;
  @ViewChild("modalRef") modalRef!: TemplateRef<any>;
  @ViewChild("vcRef", { read: ViewContainerRef }) vcRef!: ViewContainerRef;
  vRef: any = null;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
   

  ) {}
  

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

  format_date(date: any){
    return formatDate(date)
  }

  get_year(date:any){
    return getYear(date)
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