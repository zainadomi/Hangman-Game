import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import GamePageLoggedOutView from "../components/GamePageLoggedOutView";
import { HomePageProps } from "../components/types";
import styleUtils from "../styles/utils.module.css";
import Figure from "../components/Figure";
import Word from "../components/Word";
import WrongLetters from "../components/WrongLetters";
import * as GamesApi from "../network/api";
import {Game as GameModel} from '../models/game'




interface RouteParams {
  wordLength: string;
}


export default function GamePage({ loggedInUser }: HomePageProps) {

  // const { wordLength } = useParams() as unknown as RouteParams;
  const [isActive, setIsActive] = useState(true);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [game, setGame] = useState<GameModel| null>(null);
  const [word, setWord] = useState<string| null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  // const [showNotification, setShowNotification] = useState(false);


  const getGame = async () => {

    try {
      const { game, word ,gameId} = await GamesApi.getGame();
      setGame(game);
      setWord(word);
      setGameId(gameId)
    } catch (error) {
      console.error(error);
  }
}
  useEffect(() => {
   
      getGame();
    }, []);


  const guessLetter = async ( letter: string) => {

    try{
      return await GamesApi.guessLetter(gameId!,letter);
      
    }catch (error) {
      console.error(error)
    }
  }
    useEffect(() => {
      const handleKeydown = (event:KeyboardEvent): void=> {
        const { key, keyCode } = event;
        if (isActive && keyCode >= 65 && keyCode <= 90) {

          const letter= key.toLowerCase();
          if (word && word.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters((currentLetters) => [...currentLetters, letter]);
              guessLetter(letter);
            } else {
              // show(setShowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(currentLetters => [...currentLetters, letter]);
            } else {
              // show(setShowNotification);
            }
          }
        }
        if(wrongLetters.length >= 10){
          setIsActive(false)
        }
        if(correctLetters.length === word?.length){
          setIsActive(false);
        }
      };
      
      window.addEventListener('keydown', handleKeydown);

      return () => window.removeEventListener('keydown', handleKeydown);
    }, [correctLetters, wrongLetters, isActive , gameId,game]);


  function restartGame (){
    setWrongLetters([]);
    setIsActive(true)
    setCorrectLetters([])

  }

  return (
    <Container>
      <>
        {loggedInUser ? (
          <>
            <div className={styleUtils.gameContainer}>
              <div className={styleUtils.title}>
                <h3> Hangman </h3>
              </div>
              <h5 className={styleUtils.center}>
                Guess the word - Enter a letter
              </h5>

              <Figure wrongLetters={wrongLetters}/>
              <WrongLetters wrongLetters={wrongLetters}/>
              <div className={styleUtils.title}>
              <Word selectedWord={word} correctLetters={correctLetters} />
              </div>
              {wrongLetters.length > 9 &&
              <Button 
              type="submit" 
              className={styleUtils.startAgain}
              onClick={restartGame}
              >Game Over</Button>}
              {correctLetters.length === word?.length &&
              <Link to='/startGame'><Button 
              type="submit" 
              className={styleUtils.startAgain}
              onClick={restartGame}
              > Congratulations! </Button></Link>
            
              }
      
              
              {/* <Notification showNotification={showNotification} /> */}
              <div className={styleUtils.title}> Guesses left : {wrongLetters.length} / 6 </div>
            </div>
          </>
        ) : (
          <GamePageLoggedOutView />
        )}
      </>
    </Container>
  );
}
