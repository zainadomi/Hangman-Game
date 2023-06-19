import { User } from "../models/user";
import { ConflictError, UnauthorizedError } from "../errors/http_error";
import { LoginCredentials, SignupCredentials } from "../components/types";
import { Game } from "../models/game";



async function fetchData(input: RequestInfo, init?: RequestInit){

    const response = await fetch(input, init);

    if (response.ok){
        return response;

    }else{

        const errorBody = await response.json();
        const errorMessage = errorBody.error;

        if(response.status === 401){
            throw new UnauthorizedError(errorMessage)

        }else if(response.status === 409){
            throw new ConflictError(errorMessage)

        }else{
            throw Error("Request failed with status: "+ response.status + " message: " + errorMessage);

        }
    }

}

// create game

export async function fetchGames(wordLength:number): Promise<Game[]>{

    const token = localStorage.getItem("token");
    const response = await fetchData(`/api/games/${wordLength}`,{
        method: 'POST',
        headers: {
         "Authorization": `Bearer ${token}`, 
        //  "Content-Type": "application/json",
        },
      });
      if(!wordLength){
        alert('please select word length')
      }

      return response.json();

}
// get current game 


export async function getGame():Promise<{ game: Game| null, wordLength: number| null,gameId:string|null,correctGuesses:string[],incorrectGuesses:string[],shownWord:string[]}>{

    const token = localStorage.getItem("token");
    const response = await fetchData('/api/games/' ,{
        method: 'GET',
        headers: {
         "Authorization": `Bearer ${token}`, 
        },
      });
      if (!response.ok) {
        // Handle the case where there is no response or an error
        throw new Error("There was an error retrieving the game data");
        
      }
      const games = await response.json();
      console.log(games);
      const wordLength = games.wordLength;
      const gameId = games.gameId;
      const correctGuesses = games.correctGuesses;
      const incorrectGuesses = games.incorrectGuesses;
      const shownWord = games.shownWord;
      
     return { game: games, wordLength: wordLength ,gameId:gameId ,correctGuesses:correctGuesses,incorrectGuesses:incorrectGuesses,shownWord:shownWord};
    }

// guess letter 

export async function guessLetter(gameId: string, letter: string): Promise<{ shownWord: string[], incorrectGuesses: string[],correctGuesses:string[],isWon:boolean}> {
    const token = localStorage.getItem("token");
    const response = await fetchData(`/api/games/guessLetter/game/${gameId}`,{

        method:'POST',
        headers:{ 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json", 

        },
        body: JSON.stringify({ letter, gameId }),

    });
    const { shownWord, incorrectGuesses ,correctGuesses ,isWon} = await response.json();

  return { shownWord, incorrectGuesses,correctGuesses ,isWon};


}

// Get logged in user
export async function getLoggedInUser():Promise<User>{

    const token = localStorage.getItem("token");
    const response = await fetchData('/api/users',
    {
        method:'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
        },
    });
    
    return response.json();

}

// signup
export async function signup(credentials: SignupCredentials): Promise<User> {
    const response = await fetchData('/api/users/signup',{

        method:'POST',
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(credentials),
    });
    return response.json(); 

    
}

// login 
export async function login(credentials: LoginCredentials):Promise<User>{

    const response = await fetchData('/api/users/login', {
        method:'POST',
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    console.log(data);

    if (data.token) {

      localStorage.setItem("token", data.token);
      alert(`Login Successful, the user now is: ${credentials.username}`);
      console.log(localStorage.getItem("token"));
    
    } else {
      alert("Please check your email and password");
    }
    return data.user;
}

// Logout 

export async function logout(){

    localStorage.clear();
    
    await fetchData('/api/users/logout',{
        method:'POST',
    });
 }
