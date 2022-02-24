import React, { Component } from "react";
import CarouselHome from "./Carousel.js";
import Blog from "./Blog.js";
import Service from "./Services.js";
import PageDescription from "./PageDescription";
import Progress from "./Progress";
import Chatbot from "./chatbot";

class Home extends Component {
  render() {
    return (
      <>
        <CarouselHome />
        <br />
        <br />
        <br />
        <PageDescription />
        <br />
        <br />
        <br />
        <Service />
        <Progress />
        <Blog />
      </>
    );
  }
}

export default Home;
