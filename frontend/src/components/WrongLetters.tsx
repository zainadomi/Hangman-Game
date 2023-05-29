import React from 'react'
import styleUtils from '../styles/utils.module.css'


export default function WrongLetters({wrongLetters} :any) {
  return (
    <div className={styleUtils.wrongLettersContainer}>
      <div>
        {wrongLetters.length >= 0 && wrongLetters.length < 6?  
          <p>Wrong guesses:</p>:
          <p>Game over!</p>
        }
        {wrongLetters
          .map((letter:string[], i:any) => <span key={i}>{letter}</span>)
          .reduce((prev :any, curr:any) => prev === null ? [curr] : [prev, ', ', curr], null)}
       
      </div>
    </div>

  )
}
