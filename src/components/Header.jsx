import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { FcHome, FcSurvey } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Link to="/">
        HO
        <FcHome className="homeIcon" />
        ME
      </Link>

      <h2>Today's Comment</h2>

      {/* <h2
        className="write"
        onClick={() => {
          navigate("/write/add");
        }}
      >
      </h2> */}
      <Link to="/write/add">
        ME
        <FcSurvey className="homeIcon" />
        MO
      </Link>


    </Container>
  );
};

export default Header;

const Container = styled.div`
  min-width: 300px;
  width: 100%;
  margin: auto;
  height: 45px;
  box-shadow: 3px 5px 5px 1px gray;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #fdc676;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  .homeIcon {
    font-size: 20px;
    cursor: pointer;
  }
  h2 {
    font-size:17px;
    text-decoration: underline;
    text-underline-position: under;
  }
  @media (max-width: 480px) {
    border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

`;
