import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";
import meditateBg from './images/meditateBg.jpg';

const Home = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }

  const auth = useSelector((state) => state.auth);

  return (
    <>
    <div>
    <img src={ meditateBg } style={{ width:'400px', margin: 'auto', display: 'block' ,alignItems: "center"}} alt='meditationpic'/>
    </div>
    <Alert style={{ backgroundColor: "#060b26", color: "#fff" , textAlign: 'center', marginTop: '20px'}}>
      Welcome {auth.username}
    </Alert>
    </>
  );
};

export default Home;
