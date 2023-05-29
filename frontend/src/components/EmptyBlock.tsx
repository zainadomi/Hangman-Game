import React from 'react'

export default function EmptyBlock({wordLength}:any) {
//     const buildEmptyBlock = () =>{
//     let emptyBlock = 'z';
//     for(let i =0; i < wordLength; i++){
//       emptyBlock += 'z';
//     }
//     return emptyBlock;
//   };
  return (
    <div>
        {wordLength}
    </div>  
  )
}
