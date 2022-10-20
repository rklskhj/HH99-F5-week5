// import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Layout = (props) => {
  return (
    // <Container style={{ width: "" }} fixed>
    <LayoutCss>{props.children}</LayoutCss>
    // </Container>
  );
};

export default Layout;

const LayoutCss = styled.div`
  
  
  
  @media (max-width: 480px) {
    width:100%;
    height:100%;
    margin: auto;
    overflow: auto;
}

  @media (max-width: 1920px) and (min-width: 1024px) {
    margin: 20px auto;
    width:30%;
    max-height: 100%;
    height: 650px;
    background-color: #ffe9ad;
    
}

  @media (max-width: 2560px) and (min-width: 1921px) {
      margin: 220px auto;
      width:20%;
      max-height: 100%;
      height: 650px;
      background-color: #ffe9ad;
      transform: scale(1.3);
  }

`;
