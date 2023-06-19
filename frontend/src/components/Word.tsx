import React from 'react';
import styleUtils from '../styles/utils.module.css';

export default function Word({ wordLength, shownWord }: any) {
  return (
    <div className={styleUtils.word}>
      {Array.from({ length: wordLength }).map((_, i) => (
        <span className={styleUtils.letter} key={i}>
          {shownWord[i] !== ' ' ? shownWord[i] : ''}
        </span>
      ))}
    </div>
  );
}
