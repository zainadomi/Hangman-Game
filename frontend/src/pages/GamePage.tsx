import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import {useNavigate, } from "react-router-dom";
import { HomePageProps } from "../components/types";
import styleUtils from "../styles/utils.module.css";
import Figure from "../components/Figure";
import Word from "../components/Word";
import WrongLetters from "../components/WrongLetters";
import * as GamesApi from "../network/api";
import {Game as GameModel} from '../models/game'





  export default function GamePage({ loggedInUser }: HomePageProps) {

    const [isActive, setIsActive] = useState(true);
    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [wrongLetters, setWrongLetters] = useState<string[]>([]);
    const [shownWord, setShownWord] = useState<string[]>([]);
    const [game, setGame] = useState<GameModel| null>(null);
    const [wordLength, setWordLength] = useState<number| null>();
    const [isWon, setIsWon] = useState(false);


    const [gameId, setGameId] = useState<string | null>(null);
    const navigate = useNavigate();


    const getGame = async () => {

      try {
        const { game, wordLength ,gameId ,correctGuesses ,incorrectGuesses,shownWord} = await GamesApi.getGame();
        setGame(game);
        setWordLength(wordLength);
        setShownWord(shownWord)
        setGameId(gameId)
        setCorrectLetters(correctGuesses)
        setWrongLetters(incorrectGuesses)
      } catch (error) {
        console.error(error);
    }
  }
    useEffect(() => {
    
        getGame();
      }, []);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const guessLetter = async (letter: string) => {
      try {

        const response = await GamesApi.guessLetter(gameId!, letter);
        setShownWord(response.shownWord)
        setWrongLetters(response.incorrectGuesses)
        setCorrectLetters(response.correctGuesses)
        setIsWon(response.isWon)
        console.log("shown Word = " + response.shownWord)
        return response;
        
      } catch (error) {
        console.error(error);
      }
    };

      useEffect(() => {
        const handleKeydown = (event:KeyboardEvent): void=> {
          const { key, keyCode } = event;
          if(isWon === false){
            if (isActive && ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57))) {
              const letter = key;
            
              if (correctLetters.includes(letter)) {
                setCorrectLetters((currentLetters) => [...currentLetters, letter]);
                guessLetter(letter);
              } 
              if (!wrongLetters.includes(letter)) {
                  setWrongLetters(currentLetters => [...currentLetters, letter]);
                  guessLetter(letter);
  
              }
              if(wrongLetters.length >= 10 || correctLetters.length === wordLength){
                setIsActive(false)
                navigate('/startGame')
             }
              
    
            }else {
              console.log('Something went wrong')
            }
          }else{
           alert('Game is over,start a new game')
          }
         
        
        };
        
        window.addEventListener('keydown', handleKeydown);

        return () => window.removeEventListener('keydown', handleKeydown);
      }, [correctLetters, wrongLetters, isActive, gameId, game, guessLetter, navigate, wordLength,shownWord]);


    function restartGame (){
      setWrongLetters([]);
      setIsActive(true)
      setCorrectLetters([])
      navigate('/startGame')

    }

    return (
      <Container>
        <>
          {loggedInUser && isActive ?  (
            <>
              <div className={styleUtils.gameContainer}>
                <h5 className={styleUtils.center} style={{color:'purple'}}>
                  Guess the word - Enter a letter
                </h5>
                
                <Figure wrongLetters={wrongLetters}/>
                <div className={styleUtils.title}>
                <Word wordLength={wordLength} shownWord={shownWord}/>
                </div>
                {wrongLetters.length > 9 &&
                <Button 
                type="submit" 
                className={styleUtils.startAgain}
                onClick={restartGame}
                >Game Over</Button>}
                {isWon === true && 
                <Button 
                type="submit" 
                className={styleUtils.startAgain}
                onClick={restartGame}
                > Congratulations! </Button>
                }
                <WrongLetters wrongLetters={wrongLetters}/>
                {/* <Notification showNotification={showNotification} /> */}
                <div className={styleUtils.title}> Guesses left :  {10 - wrongLetters.length}</div>
              </div>
            </>
          ) : (
            navigate('/')
          )}
        </>
      </Container>
    );
  }
