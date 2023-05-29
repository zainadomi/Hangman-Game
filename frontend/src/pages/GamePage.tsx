import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GamePageLoggedOutView from "../components/GamePageLoggedOutView";
import { HomePageProps } from "../components/types";
import styleUtils from "../styles/utils.module.css";
import Figure from "../components/Figure";
import Word from "../components/Word";
import WrongLetters from "../components/WrongLetters";
import {Game as GameModel} from '../models/game'


interface RouteParams {
  wordLength: string;
}

export default function GamePage({ loggedInUser }: HomePageProps) {
  
  const { wordLength } = useParams() as unknown as RouteParams;
  const wordLengthVal = parseInt(wordLength);
  const [randomWord, setRandomWord] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  // const [showNotification, setShowNotification] = useState(false);

  const API_URL = `http://api.datamuse.com/words?sp=${"?".repeat(wordLengthVal)}&max=1000`;

//   interface GameProps{
//     game: GameModel
// }

//   const Game = ({game}:GameProps) =>{
//     const {
//         word,
//         wordLength,
//         correctGuesses,
//         incorrectGuesses,
//         guesses,
//         remainingGuesses,
//         isActive,
//     } = game;
// }

// move it to backebd
  const generateRandomWord = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomWord = data[randomIndex].word; // Access the word property of the randomly selected index
        setRandomWord(randomWord);
        console.log(randomWord);
      } else {
        throw new Error("Failed to fetch random word");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generateRandomWord();
  }, []);


  useEffect(() => {
    const handleKeydown = (event:KeyboardEvent):any => {
      const { key, keyCode } = event;
      if (isActive && keyCode >= 65 && keyCode <= 90) {

        const letter= key.toLowerCase();
        if (randomWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
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
      if(wrongLetters.length >= 5){
        setIsActive(false)
      }
      
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, isActive]);


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
              <Word selectedWord={randomWord} correctLetters={correctLetters} />
              </div>
              {wrongLetters.length > 5 &&
              <Button 
              type="submit" 
              className={styleUtils.startAgain}
              onClick={restartGame}
              >Start again</Button>}
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
