import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hasErrors: boolean = false;
  public errors = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  Login(e: Event) {

    const  {
      email,
      password,
    } = window as any;

    this.authService.Authenticate({email: email.value, password: password.value})
      .subscribe(user => {
        const token = user.data.token
        window.localStorage.setItem("_token", token);
      
        this.router.navigate(["/movieslist"])

    }, error => {
      this.hasErrors = true;

      alert(error.error.data.error)

    })
  }

}
