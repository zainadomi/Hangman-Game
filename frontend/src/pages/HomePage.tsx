import { Container } from "react-bootstrap";
import StartGamePageLoggedInView from "../components/StartGamePageLoggedInView";
import { HomePageProps } from "../components/types";
import LogInModal from "../components/LogInModal";
import { useState } from "react";
import { User } from "../models/user";



const HomePage = ({loggedInUser}:HomePageProps) => {
  // const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  // const [onLoginSuccsessful, setOnLoginSuccessful] = useState<User | null>(null);
  const [showSignUpModel, setShowSignUpModel] = useState(false);
  const [showLoginModel, setShowLoginUpModel] = useState(false);
    return ( 
        <Container >
        <>
        {
          loggedInUser
          ? <StartGamePageLoggedInView />
          : <LogInModal
          onLoginSuccsessful={(user) => {
            // setLoggedInUser(user);
            setShowLoginUpModel(false);
          }}
        />
        }

        </>
        </Container>

     );
}
 
export default HomePage;