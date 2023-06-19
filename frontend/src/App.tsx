import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import * as GameApi from "./network/api";
import { User } from "./models/user";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import LogInModal from "./components/LogInModal";
import { Container } from "react-bootstrap";
import GamePage from "./pages/GamePage";
import StartGamePageLoggedInView from "./components/StartGamePageLoggedInView";



function App(){

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null); 

  const fetchLoggedInUser = async ()=> {

    try {
      const user = await GameApi.getLoggedInUser();
      setLoggedInUser(user);
    } catch (error) {
      console.error(error);
    }
  
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!!token){
      fetchLoggedInUser();
    }
    
  },[]);

  

  return (
   <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => {
            // setShowLoginUpModel(true);
          }}
          onLogoutSuccesful={() => {
            setLoggedInUser(null);
          }}
          onSignUpClicked={() => {
            // setShowSignUpModel(true);
          }}
        />
        <Container className="pageContainer">
          <Routes>

            <Route
              path="/"
              element={<LogInModal
                onLoginSuccsessful={(user) => {
                  setLoggedInUser(user);
                }}
              />}
            />
             <Route
              path="/signUpModal"
              element={<SignUpModal onSignUpSuccessful={(user) => {
                setLoggedInUser(user);
              }} />}
            />

            <Route  
            path="/gamepage/:wordLength"
             element={<GamePage loggedInUser={loggedInUser} />}
             />
            <Route
              path="/startGame"
              element={<StartGamePageLoggedInView />}
            />
           
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
