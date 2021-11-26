import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {formatDate,dateToInputDate} from "../../../utils"
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
  selector: "app-editmovie",
  templateUrl: "./editmovie.component.html",
  styleUrls: ["./editmovie.component.css"],
})
export class EditmovieComponent implements OnInit {
  categories:ICategory[] = [];
  file = {} as IFile

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

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file){
        this.file.data = event.target.files[0];
        this.file.name = file.name;
    }
    console.log(Object.keys(this.file).length)
    console.log(this.file)

  }

  fetchCategories() {
    this.http
      .get(`${environment.baseApiUrl}/categories`)
      .subscribe((data: any) => {
        this.categories = data.data
      });
  }

  editNewMovie(e: Event) {
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
    
    this.http.put(`${environment.baseApiUrl}/movie/${this.movie?.id}`, formData)
    .subscribe(
      (data) => {
        this.disable = false;
        this.closeDialog.emit("");
        window.location.reload();
      },
      (err) => {
        alert(err.error.data.error)
        this.disable = false;
      }
    );
  }
  closeModal() {
    this.closeDialog.emit("");
  }
}