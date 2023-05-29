import React from 'react'
import styleUtils from '../styles/utils.module.css'

export default function Word({selectedWord,correctLetters}:any) {
  return (
    <div className={styleUtils.word}>
      {String(selectedWord).split('').map((letter:any,i:any)=>{
        return(
             <span className={styleUtils.letter} key={i}>
                {(correctLetters).includes(letter)? letter : ''}
            </span>       

        )
      })}
    </div>
  )
}