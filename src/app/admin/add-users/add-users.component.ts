import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface User {
  userid: string;
  username: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css'
})
export class AddUsersComponent {
  newUser: User = {
    userid: '',
    username: '',
    password: '',
    role: 'user'
  };
  message: string = '';

  constructor(private http: HttpClient) {}

  addUser() {
    this.http.post('http://localhost:3000/api/users', this.newUser).subscribe(
      (response: any) => {
        this.message = 'User added successfully!';
        this.newUser = { userid: '', username: '', password: '', role: 'user' };
      },
      (error) => {
        this.message = 'Error adding user: ' + error.message;
      }
    );
  }
}
