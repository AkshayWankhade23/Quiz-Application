import React, { useState } from "react";
import Signup from "../../components/SignUp/SignUp";
import Login from "../../components/Login/Login";
import style from "./Style.module.css"

const Home = () => {
  
  const [displayComponent, setDisplayComponent] = useState("signup");

  const handleButtonClick = (component) => {
    setDisplayComponent(component);
  };

 

  return (
    <div className={style.container}>
      <h2>QUIZZIE</h2>
      <div>
        <button className={style.signUp} onClick={() => handleButtonClick("signup")}>Sign Up</button>
        <button className={style.signUp} onClick={() => handleButtonClick("login")}>Login</button>
      </div>
      <div>
        {displayComponent === "signup" && <Signup />}
        {displayComponent === "login" && <Login />}
      </div>
    </div>
  );
};

export default Home;