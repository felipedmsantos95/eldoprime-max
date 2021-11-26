import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { environment } from "../../../environments/environment"


interface ICategory {
  name: string;
  id: number;
}

interface IFile {
  name: string,
  data: File
}

@Component({
  selector: "app-addmovie",
  templateUrl: "./addmovie.component.html",
  styleUrls: [ "./addmovie.component.css"],
})

export class AddmovieComponent implements OnInit {
  categories:ICategory[] = [];
  file = {} as IFile

  @Output() closeDialog = new EventEmitter();
  @Output() refreshMovies = new EventEmitter();
  disable = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchCategories(); 
  }
  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file){
        this.file.data = event.target.files[0];
        this.file.name = file.name;
    }
  }
  fetchCategories() {
    this.http
      .get(`${environment.baseApiUrl}/categories`)
      .subscribe((data: any) => {
        this.categories = data.data
      });
  }
  addNewMovie(e: Event) {
    this.disable = true;
    const {
      addMovieName,
      addMovieYear,
      addMovieGenre,
      addMovieSynopsis,
    } = window as any;

    let formData = new FormData()
    formData.append('name', addMovieName.value)
    formData.append('year_release', addMovieYear.value)
    formData.append('synopsis', addMovieSynopsis.value)
    formData.append('category_id', addMovieGenre.value)
    if(Object.keys(this.file).length != 0)
      formData.append('poster', this.file.data, this.file.name)

    this.http.post(`${environment.baseApiUrl}/movie`, formData)
    .subscribe(
      (data) => {
        this.disable = false;
        this.refreshMovies.emit("");
        this.closeDialog.emit("");
      },
      (err) => {
        alert(err.error.data.error)
        this.disable = false;
      }
    );
  }
  closeModal() {
    this.closeDialog.emit("/movieslist");
  }
}