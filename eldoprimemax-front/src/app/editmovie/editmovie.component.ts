import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {formatDate,dateToInputDate} from "../../utils"

interface ICategory {
  name: string;
  id: number;
}


@Component({
  selector: "app-editmovie",
  templateUrl: "./editmovie.component.html",
  styleUrls: ["./editmovie.component.css"],
})
export class EditmovieComponent implements OnInit {
  categories:ICategory[] = [];
  @Output() closeDialog = new EventEmitter();
  @Output() refreshMovies = new EventEmitter();
  @Input() movie: any;
  disable = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchCategories();
  }
  format_date(date: string){
    return formatDate(date)
  }
  edited_date(date: string){
    return dateToInputDate(date)
  }
  fetchCategories() {
    this.http
      .get("http://localhost:3001/categories")
      .subscribe((data: any) => {
        this.categories = data.data

        console.log(this.categories)

      });
  }
  editNewMovie(e: Event) {
    this.disable = true;
    const {
      addMovieName,
      addMovieYear,
      addMovieGenre,
      addMovieImageUrl,
      addMovieSynopsis,
    } = window as any;
    this.http
      .put("http://localhost:3001/movie/" + this.movie?.id, {
        name: addMovieName.value,
        year_release: addMovieYear.value,
        synopsis: addMovieSynopsis.value,
        poster: addMovieImageUrl.value,
        category_id: addMovieGenre.value,
      })
      .subscribe(
        (data) => {
          this.disable = false;
          this.closeDialog.emit("");
          window.location.reload();
        },
        (err) => {
          this.disable = false;
        }
      );
  }
  closeModal() {
    this.closeDialog.emit("");
  }
}