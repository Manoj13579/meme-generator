import React from "react";
import memeIcon from "../assets/meme.png";
import "./Header.css";


const Header = () => {
  return (
    <header className="navbar">
    <div className="left-side">
        <img src={memeIcon}/>
        <h2 className="leftside-text">MemeGenerator</h2>
    </div>
    </header>
  )
}

export default Header