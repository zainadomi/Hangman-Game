import React, { useState } from "react";
import { Button} from "react-bootstrap";
import styleUtils from '../styles/utils.module.css';
import { useNavigate } from "react-router-dom";
import {Game as GameModel} from '../models/game'
import * as GamesApi from "../network/api";


export default function StartGamePageLoggedInView() {
  const [wordLength,setWordLength] = useState();
  const [game, setGame] = useState<GameModel[]>([]);
  const navigate = useNavigate();


  function handleWordLength (event:any) {
    setWordLength(event.target.value)
  }

  async function startGame() {
    if (!wordLength) {
      alert("Please select a word length");
      return;
    }
  
    try {
      const game = await GamesApi.fetchGames(parseInt(wordLength));
      setGame(game);
      navigate(`/gamepage/${wordLength}`);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
    
    <div className="justify-content-center align-items-center d-flex w-30 vh-100 bg-white text-dark">
        <div className={styleUtils.selectwordDiv}>
          <h1 className={styleUtils.selectedWordLength}>Select word length</h1>
          <select className="form-select form-select-lg mb-3" aria-label="Default select example" style={{border:'solid 1px purple',color:'purple'}} onChange={handleWordLength} defaultValue="3">
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>

          
          <Button 
           type="submit" 
           className={styleUtils.buttonStyle}
           onClick={startGame}
           >   
            Start Game
           </Button>
        </div>
      </div>
      
    </>
  );
}
