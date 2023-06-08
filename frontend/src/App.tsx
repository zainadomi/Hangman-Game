import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import * as NotesApi from "./network/api";
import { User } from "./models/user";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import LogInModal from "./components/LogInModal";
import { Container } from "react-bootstrap";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";


function App(){

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModel, setShowSignUpModel] = useState(false);
  const [showLoginModel, setShowLoginUpModel] = useState(false);

  const fetchLoggedInUser = async ()=> {

    try {
      const user = await NotesApi.getLoggedInUser();
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
            setShowLoginUpModel(true);
          }}
          onLogoutSuccesful={() => {
            setLoggedInUser(null);
          }}
          onSignUpClicked={() => {
            setShowSignUpModel(true);
          }}
        />
        <Container className="pageContainer">
          <Routes>

            <Route
              path="/"
              element={<HomePage loggedInUser={loggedInUser} />}
            />

            <Route  
            path="/gamepage/:wordLength"
             element={<GamePage loggedInUser={loggedInUser} />}
             />
            
           
          </Routes>
        </Container>

        {showSignUpModel && (
          <SignUpModal
            onDismiss={() => {
              setShowSignUpModel(false);
            }}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginUpModel(false);
            }}
          />
        )}

        {showLoginModel && (
          <LogInModal
            onDismiss={() => {
              setShowLoginUpModel(false);
            }}
            onLoginSuccsessful={(user) => {
              setLoggedInUser(user);
              setShowLoginUpModel(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
