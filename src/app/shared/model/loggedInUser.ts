export class LoggedInUser {
    id: string;
    auth_token: string;
    expires_in: number;
    userName:string;


    constructor(id: string, auth_token: string, expires_in: number, userName:string){
      this.auth_token = auth_token;
      this.expires_in = expires_in;
      this.id = id;
      this.userName = userName;
    }
  }
  
  