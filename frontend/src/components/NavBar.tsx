import { Container, Nav, Navbar } from "react-bootstrap";
import { NavBarProps } from "./types";
import { Link } from "react-router-dom";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedoutView from "./NavBarLoggedoutView";


const NavBar  = ({loggedInUser,onSignUpClicked,onLoginClicked,onLogoutSuccesful}: NavBarProps) => {
    return (  
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Hangman Guessing Game
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link}  to='/privacy'>
                            Privacy  
                        </Nav.Link>
                    </Nav>
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