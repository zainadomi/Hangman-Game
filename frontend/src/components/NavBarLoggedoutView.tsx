import { Button } from "react-bootstrap";
import { NavBarLoggedoutViewProps } from "./types";

const NavBarLoggedoutView = ({onSignUpClicked,onLoginClicked}:NavBarLoggedoutViewProps) => {
    return ( 
      <>
      <Button className="btn btn-dark" onClick={onSignUpClicked}>Sign Up</Button>
      <Button className="btn btn-dark" onClick={onLoginClicked}>Log In</Button>

     </>

     );
}
 
export default NavBarLoggedoutView;