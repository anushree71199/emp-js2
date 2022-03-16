// import axios from "axios";
import React from "react";
import authToken from "../utils/authToken";
import homeBg from './images/homeBg.jpg';
// import { Card } from "react-bootstrap";

const Welcome = (props) => {
  // const [quotes, setQuotes] = useState("");

  // useEffect(() => {
  //   if (quotes === "") {
  //     axios.get("https://type.fit/api/quotes").then((response) => {
  //       setQuotes(response.data);
  //     });
  //   }
  // }, [quotes]);

  return (
    <div>
      <img src={ homeBg }  style={{ width:'500px', margin: 'auto', display: 'block' ,alignItems: "center"}} alt='business'/>
      <h1 style={{textAlign: 'center'}}>Welcome to Employee Management System</h1>
</div>
      );
};

export default Welcome;
