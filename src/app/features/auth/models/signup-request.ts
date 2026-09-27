export interface SignupRequest {
     email: string;
  password: string;
  data: {
    name: string;
    department?: string;
  };
}
