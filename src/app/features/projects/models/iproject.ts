export interface IProject {
  id: string;
  name: string;
  description: string;
  epics?: number;
  tasks?: number;
  members?: number;
  created_at: string;
}

export interface IProjectRequest {
  name: string;
  description: string;
}
export interface Member {
member_id:string;
project_id:string
  role: MemberRole;
  metadata:memberData
}

export interface memberData {
  sub: string;
  name: string;
  email: string;
  department: string;
}

type MemberRole = 'owner' | 'admin' | 'member' | 'viewer';