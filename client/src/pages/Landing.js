import React from "react";
import main from "../assets/images/main.svg";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            distinctio sequi quaerat neque incidunt voluptatum recusandae,
            cumque animi iure quos.
          </p>
          <Link to="/register" className="btn btn-hero">
            Get Started
          </Link>
        </div>

        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
