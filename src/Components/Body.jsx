import React, { useEffect, useState } from 'react';
import  './Body.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../Utilily/Loader';




const Body = () => {
  const[meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1big.jpg"
  }
  );
 
  const[allMemes, setAllMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getMemeFromApi = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes")
      setAllMemes(response.data.data.memes);
      toast.success('successfully fetched data')
    } catch (error) {
      console.error(error);
      toast.error("sorry error occurred. try again later")
    }
    setLoading(false);
  };
  useEffect(() => {
      getMemeFromApi();
  }, []); 
  
    const getMemeImage = ()=>{
      const randomNumber = Math.floor(Math.random() * allMemes?.length);
      const url = (allMemes[randomNumber].url);
      setMeme((prevState)=>{
        return({
          ...prevState,
          randomImage: url
        })
      })
    }
  
    const handleChange = (event)=>{
      const{name, value}= event.target;
      setMeme((prevState)=>{
      return{
        ...prevState,
        [name]: value,
      }
      })
      }

  return (
    <>
    {loading && <Loader />}
    <section className='body-container'>
     <div className='input-box'>
      <input className='inputbox-1'
       type='text'
       placeholder='Top Text'
       name='topText'
       onChange={handleChange}
       value={meme.topText}
       />
      <input className='inputbox-2'
      type='text'
      placeholder='Bottom Text'
      name='bottomText'
      onChange={handleChange}
      value={meme.bottomText}
      />
     </div>
     <div>
        <button onClick={getMemeImage}><h3>Get a new meme image🖼️</h3></button>
    </div>
    <div className='container'>
  <div className='image-wrapper'>
    <img className='meme-image' src={meme.randomImage} alt='Meme' />
    <h1 className='top-text'>{meme.topText}</h1>
    <h1 className='bottom-text'>{meme.bottomText}</h1>
  </div>
</div>
</section>
</>
  )
}

export default Body