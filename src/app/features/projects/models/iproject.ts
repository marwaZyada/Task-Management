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
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  initials: string;
}

type MemberRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';