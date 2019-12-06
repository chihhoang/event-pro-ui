import React from "react";
import image from "../Images/image-event.jpg";
import Image from "react-bootstrap/Image";

const Home = () => {
  return (
    <div>
      {" "}
      <h1>Home Test</h1>
      <a href="/list">
        <Image src={image} width="500px" height="500px" thumbnail />
      </a>
    </div>
  );
};

export default Home;
