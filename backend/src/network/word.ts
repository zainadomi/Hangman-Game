export const generateWord = async (wordLength:number) =>{
    const API_URL = `http://api.datamuse.com/words?sp=${"?".repeat(wordLength)}&max=1000`;
    try{
        const response = await fetch(API_URL,{});
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex].word

    }catch(error){
        console.log(error)
    }


}