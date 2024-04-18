import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmitterService } from '../../emmiter.service';
import { NavComponent } from '../nav/nav.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


  export class HomeComponent implements OnInit {
    message: string = '';
  
    constructor(private http: HttpClient, private emitterService: EmitterService) {}
  
    ngOnInit(): void {
      this.http.get('http://localhost:5000/api/user', { withCredentials: true }).subscribe(
        (res: any) => {
          this.message = `Hi ${res.name}`;
          EmitterService.authEmitter.emit(true);
        },
        (err) => {

          this.message = 'Please Login/Reg. To Continue!';
          EmitterService.authEmitter.emit(false);
        }
        
      );
    }
    }