import { Component, Input, OnInit } from "@angular/core";
import {getYear} from "../../utils"


@Component({
  selector: "app-moviecard",
  templateUrl: "./moviecard.component.html",
  styleUrls: ["./moviecard.component.css"],
})
export class MoviecardComponent implements OnInit {
  @Input() movie: any;
  constructor() {}
  ngOnInit(): void {}
  
  get_year(date:any){
    return getYear(date)
  }
}