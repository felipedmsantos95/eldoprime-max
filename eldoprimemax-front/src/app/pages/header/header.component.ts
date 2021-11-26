import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment"


interface ICategory {
  name: string;
  id: number;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  categories:ICategory[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchCategories(); 
  }
  fetchCategories() {
    this.http
      .get(`${environment.baseApiUrl}/categories`)
      .subscribe((data: any) => {
        this.categories = data.data
      });
  }

  filterMovies(id: any){
    console.log(id)
    return id
  }
}