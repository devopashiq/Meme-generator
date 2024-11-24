import "../App.css";
import { useState, useEffect } from "react";
import MemeCanvas from './MemeCanvas';


export default function Meme() {
  const [meme, setMeme] = useState({
    Top_Text: "",
    Bottom_Text: "",
    RandomImg: "http://i.imgflip.com/1bij.jpg",
  });

  const [memeList ,setMemelist] = useState([]);

  useEffect(() => {
    const url = "https://api.imgflip.com/get_memes";
    async function fetchData() {
      try{
        const response = await fetch(url);
        if(!response.ok){
          throw new Error("Could not fetch resource")
        }
        const data = await response.json();
        setMemelist(data.data.memes)
      }
      catch(error){
        console.error(error);
      }
      
    }
    fetchData()
   
  }, []);

  function getRandomimg(event) {
    event.preventDefault();
   const randomNumber = Math.floor(Math.random() * memeList.length);
   setMeme(prevMeme => (
    {
      ...prevMeme,
      RandomImg:memeList[randomNumber].url
    }
   ));

  
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  return (
    <main>
      <form className="Form_container">
        <div className="form-group topinput">
          <label htmlFor="Top-Text">Top-Text</label>
          <input
            type="text"
            id="Top-Text"
            placeholder="Top-Text"
            onChange={handleChange}
            name="Top_Text"
            value={meme.Top_Text}
          />
        </div>
       
        <div className="form-group ">
          <label htmlFor="Bottom-Text">Bottom-Text</label>
          <input
            type="text"
            id="Bottom-Text"
            placeholder="Bottom-Text"
            onChange={handleChange}
            name="Bottom_Text"
            value={meme.Bottom_Text}
          />
        </div>

        <button className="Form_button gradient" onClick={getRandomimg}>
          Get a new meme image 🖼
        </button>
      </form>
      <div className="meme">
        <img src={meme.RandomImg} alt="Meme_Images" className="meme-img" />
        <h2 className="meme--text top">{meme.Top_Text}</h2>
        <h2 className="meme--text bottom">{meme.Bottom_Text}</h2>
      
      </div>
      <MemeCanvas meme={meme}/>
    </main>
  );
}
