import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../service/project-service';
import { Member } from '../../models/iproject';
import { ActivatedRoute, Router } from '@angular/router';





@Component({
  selector: 'app-members',
  imports: [],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements OnInit{
private projectservice=inject(ProjectService)
private router=inject(Router)
private route=inject(ActivatedRoute)
projectMember :Member[]=[]
id:string|null=''
ngOnInit(): void {
  this.id= this.route.snapshot.paramMap.get('id')!
  this.getProjectMember(this.id);
}

getProjectMember(id:string){
  this.projectservice.getAllMembers(id).subscribe({
    next:(response)=>{
      console.log("members",response)

    },
    error:(error)=>{
      this.router.navigate(['/project/problem']);
console.log("member error",error.error.errorMessage)
    }
  })
}


 



  members = signal<Member[]>([
    {
      id: '1',
      name: 'Mahmoud Taha',
      email: 'mahmoud.taha.dev@gmail.com',
      role: 'OWNER',
      initials: 'MT',
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      email: 's.jenkins@workspace.com',
      role: 'ADMIN',
      initials: 'SJ',
    },
    {
      id: '3',
      name: 'David Lee',
      email: 'd.lee@workspace.com',
      role: 'MEMBER',
      initials: 'DL',
    },
    {
      id: '4',
      name: 'Alisa Mayer',
      email: 'a.mayer@workspace.com',
      role: 'VIEWER',
      initials: 'AM',
    },
  ]);

  trackById(_: number, member: Member): string {
    return member.id;
  }
}
