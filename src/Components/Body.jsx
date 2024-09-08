import React, { useEffect, useState, useRef } from 'react';
import './Body.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../Utilily/Loader';
import { exportComponentAsJPEG } from 'react-component-export-image';


const Body = () => {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'https://i.imgflip.com/1big.jpg',
  });

  const [allMemes, setAllMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const memeRef = useRef(null);

  const getMemeFromApi = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      setAllMemes(response.data.data.memes);
    } catch (error) {
      console.error(error);
      toast.error('Sorry, an error occurred. Try again later.');
    }
    setLoading(false);
  };

  useEffect(() => {
    getMemeFromApi();
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevState) => ({
      ...prevState,
      randomImage: url,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <>
      {loading && <Loader />}
      <section className="body-container">
        <div className="input-box">
          <input
            className="inputbox-1"
            type="text"
            placeholder="Top Text"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
          <input
            className="inputbox-2"
            type="text"
            placeholder="Bottom Text"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </div>
        <div>
          <button onClick={getMemeImage}>
            <h3>Get a new meme image🖼️</h3>
          </button>
        </div>
        <div  className="container">
          {/* The ref={memeRef} attribute attaches the memeRef to the div element with the class image-wrapper. This means that after the component is rendered, memeRef.current will point to this div DOM element. */}
          <div ref={memeRef} className="image-wrapper">
            <img className="meme-image" src={meme.randomImage} alt="Meme" />
            <h1 className="top-text">{meme.topText}</h1>
            <h1 className="bottom-text">{meme.bottomText}</h1>
          </div>
        </div>
        <button onClick={() => exportComponentAsJPEG(memeRef)}><h3>Download Meme</h3></button>
      </section>
    </>
  );
};

export default Body;