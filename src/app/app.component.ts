import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'services-frontend';

  message(msg: string) {
    console.log(msg)
  }

  ngOnInit() {
    this.message('Hello World')
  }
}
