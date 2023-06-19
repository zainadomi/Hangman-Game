import { Container, Nav, Navbar } from "react-bootstrap";
import { NavBarProps } from "./types";
import { Link } from "react-router-dom";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedoutView from "./NavBarLoggedoutView";
import styleUtils from "../styles/utils.module.css";


const NavBar  = ({loggedInUser,onSignUpClicked,onLoginClicked,onLogoutSuccesful}: NavBarProps) => {
    return (  
        <Navbar className={styleUtils.navBarbg} variant="danger" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className={styleUtils.gameTitle}>
                    Hangman Guessing Game
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
               
                    <Nav className="ms-auto">   
                        {loggedInUser
                        ? <NavBarLoggedInView  user={loggedInUser} onLoggedoutSuccessful={onLogoutSuccesful}/>
                        : <NavBarLoggedoutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
 
export default NavBar ;