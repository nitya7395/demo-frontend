import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  selectedValue:any="Select Value";
  content?:any;
  allPermission?:any;
  isAddNewGroup:boolean=false;
  user:any;
  id: any;
  constructor(private route: ActivatedRoute,private userService: UserService,private router: Router, private storageService: StorageService) { }

  createGroup():any{
    if(this.selectedValue !=="Select Value"){
        let group:any = {
          "name": this.selectedValue,
          "userId": this.id }
      this.userService.createGroup(group).subscribe((res: any) => {
          this.router.navigate(['/home']);
         }
        );

    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

   this.getAllPermission();
    this.getUser();
  }

  getAllPermission():any{
    this.userService.getAllPermission().subscribe({
      next: data => {
        this.allPermission = data;
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
getUser():any{
  this.userService.getuserById(this.id).subscribe({
    next: data => {
      this.user = data;
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
}
