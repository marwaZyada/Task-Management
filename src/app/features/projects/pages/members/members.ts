import { Component, signal } from '@angular/core';



interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  initials: string;
}
 type MemberRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
@Component({
  selector: 'app-members',
  imports: [],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members {

 




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
