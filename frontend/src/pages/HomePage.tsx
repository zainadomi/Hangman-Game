import { Container } from "react-bootstrap";
import StartGamePageLoggedInView from "../components/StartGamePageLoggedInView";
import GamePageLoggedOutView from "../components/GamePageLoggedOutView";
import { HomePageProps } from "../components/types";



const HomePage = ({loggedInUser}:HomePageProps) => {
    return ( 
        <Container >
        <>
        {
          loggedInUser
          ? <StartGamePageLoggedInView />
          : <GamePageLoggedOutView /> 
        }

        </>
        </Container>

     );
}
 
export default HomePage;