import React, { useState } from "react";
import { Button} from "react-bootstrap";
import styleUtils from '../styles/utils.module.css';
import { Link } from "react-router-dom";



export default function StartGamePageLoggedInView() {
  const [wordLength,setWordLength] = useState();

  function handleWordLength (event:any) {
    setWordLength(event.target.value)
    console.log(wordLength);
  }
  return (
    <>
    
    <div className="justify-content-center align-items-center d-flex w-30 vh-100 bg-white text-dark">
        <div >
          <h1>Select word length</h1>
          <select className="form-select" aria-label="Default select example" onChange={handleWordLength}>
          <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>

           <Link to={`/gamepage/${wordLength}`}> <Button 
           type="submit" 
           className={styleUtils.buttonStyle}>   
            Start Game
           </Button></Link> 
         
        </div>
      </div>
      
    </>
  );
}
