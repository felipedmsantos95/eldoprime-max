import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
@Component({
  selector: "app-addmovie",
  template: `
    <div class="modal">
      <div class="modal-backdrop" (click)="closeModal()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>Adicionar Filme</h3>
          <span style="padding: 10px;cursor: pointer;" (click)="closeModal()"
            >X</span
          >
        </div>
        <div class="modal-body content">
          <div class="inputField">
            <div class="label"><label>Título do Filme</label></div>
            <div><input id="addMovieName" type="text" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>Gênero</label></div>
            <div><select id="addMovieGenre" type="text" ></select></div>
          </div>
          <div class="inputField">
          <div class="label"><label>Sinopse</label></div>
          <div><input id="addMovieSynopsis" type="text" /></div>
          </div>
          <div class="inputField">
          <div class="label"><label>Data de Lançamento</label></div>
          <div><input id="addMovieYear" type="date" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>Adicionar Imagem</label></div>
            <div><input id="addMovieImageUrl" type="text" /></div>
          </div>
        </div>
        <div class="modal-footer">
          <button (click)="closeModal()">Cancelar</button>
          <button
            [disabled]="disable"
            class="btn"
            (click)="addNewMovie($event)"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .label {
        padding: 4px 0;
        font-size: small;
        color: rgb(51, 55, 64);
      }
      .content {
        display: flex;
        flex-wrap: wrap;
      }
      .inputField {
        margin: 3px 7px;
        flex: 1 40%;
      }
    `,
  ],
})
export class AddmovieComponent implements OnInit {
  @Output() closeDialog = new EventEmitter();
  @Output() refreshMovies = new EventEmitter();
  disable = false;
  categories = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchCategories();

    

    console.log(this.categories)

    
  }
  fetchCategories() {
    this.http
      .get("http://localhost:3001/categories")
      .subscribe((data: any) => {
        this.categories = data.data

        console.log(this.categories)
        let select = document.getElementById("addMovieGenre");

        // for(let category in this.categories){
        //     let element = document.createElement("option")
        //     element.textContent = category.name
        //     element.value = category.id
        //     select.appendChild(element);
        // }
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