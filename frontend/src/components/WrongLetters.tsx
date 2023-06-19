import React from 'react'
import styleUtils from '../styles/utils.module.css'


export default function WrongLetters({wrongLetters} :any) {
  return (
    <div className={styleUtils.wrongGuesses}>
      <div>
        <p>Wrong guesses:</p>
        {wrongLetters
          .map((letter:string[], i:any) => <span key={i}>{letter}</span>)
          .reduce((prev :any, curr:any) => prev === null ? [curr] : [prev, ', ', curr], null)}
       
      </div>
    </div>

  )
}
