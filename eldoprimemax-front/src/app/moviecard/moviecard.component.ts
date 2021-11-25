import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "app-moviecard",
  templateUrl: "./moviecard.component.html",
  styleUrls: ["./moviecard.component.css"],
})
export class MoviecardComponent implements OnInit {
  @Input() movie: any;
  constructor() {}
  formatDate(date: any){
    let splitedDate = date.split(/[- : T Z]/);
    return new Date(Date.UTC(splitedDate[0], splitedDate[1]-1, splitedDate[2], splitedDate[3], splitedDate[4]))
  }
  ngOnInit(): void {}
}