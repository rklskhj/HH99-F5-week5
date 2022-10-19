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
    
}

  @media (max-width: 1920px) and (min-width: 1024px) {
    margin: 20px auto;
    width:30%;
    max-height: 100%;
    height: 650px;
    background-color: #ffe9ad;
    
}


 
`;
