import { Component, OnInit } from '@angular/core';
import { User } from '../../backend/models/user.model';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
