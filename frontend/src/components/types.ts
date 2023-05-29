import { User } from "../models/user";

export interface NavBarProps{

    loggedInUser: User | null,
    onSignUpClicked: ()=> void,
    onLoginClicked: ()=> void,
    onLogoutSuccesful : ()=> void,
}

export interface NavBarLoggedInViewProps{
    user:User,
    onLoggedoutSuccessful:()=>void,

 }

 export interface  NavBarLoggedoutViewProps{
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

export interface SignupCredentials{
    usename: string,
    email: string,
    password: string,
}

export interface SignUpModalProps {
    onDismiss: () => void;
    onSignUpSuccessful: (user: User) => void;
  }

export interface LoginModalProps {
    onDismiss: () => void;
    onLoginSuccsessful: (user: User) => void;
  }

  export interface LoginCredentials {
    username:string,
    password:string,
 }

 export interface HomePageProps{
  loggedInUser: User | null,
}

