import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

interface ICategory {
  name: string;
  id: number;
}

@Component({
  selector: "app-addmovie",
  templateUrl: "./addmovie.component.html",
  styleUrls: [ "./addmovie.component.css"],
})

export class AddmovieComponent implements OnInit {
  categories:ICategory[] = [];
  fileToUpload: File | null = null;
  @Output() closeDialog = new EventEmitter();
  @Output() refreshMovies = new EventEmitter();
  disable = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchCategories(); 
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  fetchCategories() {
    this.http
      .get("http://localhost:3001/categories")
      .subscribe((data: any) => {
        this.categories = data.data

        console.log(this.categories)

      });
  }
  addNewMovie(e: Event) {
    this.disable = true;
    const {
      addMovieName,
      addMovieYear,
      addMovieGenre,
      addMovieImageUrl,
      addMovieSynopsis,
    } = window as any;
    this.http
      .post("http://localhost:3001/movie", {
        name: addMovieName.value,
        year_release: addMovieYear.value,
        synopsis: addMovieSynopsis.value,
        poster: addMovieImageUrl.value,
        category_id: addMovieGenre.value,
      })
      .subscribe(
        (data) => {
          this.disable = false;
          this.refreshMovies.emit("");
          this.closeDialog.emit("");
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