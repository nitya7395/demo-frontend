import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: any;
  userList?:any;   
  sessionUser?:any;
  constructor(private userService: UserService,private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.sessionUser = this.storageService.getUser();
    console.log(this.sessionUser);
    this.userService.getAllUser().subscribe({
      next: data => {
        this.userList = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }

  deleteUser(id:any): void {
    this.userService.deleteUser(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  statusUpdate(id:any, isActive:boolean): void {
    this.userService.updateUserStatus(id,isActive).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  addGroup(id:any):any {
    this.router.navigate(['/group'], { queryParams: { id: id } });
  }


}
