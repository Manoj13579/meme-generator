import React from "react";
import memeLogo from "../assets/meme.png";
import "./Header.css";


const Header = () => {
  return (
    <header className="navbar">
    <nav className="left-side">
        <img src={memeLogo} alt="Cool Meme Generator Logo"/>
        <h2 className="leftside-text">MemeGenerator</h2>
    </nav>
    </header>
  )
}

export default Header