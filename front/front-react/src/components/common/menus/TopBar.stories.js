import React from 'react';
import TopBar from './TopBar'
import { StylesProvider } from '@material-ui/core/styles';
// import styled from 'styled-components';
// import { Slide } from '@material-ui/core';

// export const TopBar = () => {
//   return(
//     <Slide in={true} direction="down">
//       <StTopCont>
//         <StLogo>로고</StLogo>
//       </StTopCont>
//     </Slide>
//   )
// }

export default {
  component: TopBar,
  title: 'Menu',
};

export const topBar = () => <StylesProvider injectFirst><TopBar/></StylesProvider>

// const StTopCont = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   background: gray;
//   width: 100%;
//   height: 48px;
// `

// const StLogo = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   width: 50%;
//   height: 100%;
  
//   background: #f2f2f2;
//   border: 3px solid gray;
//   box-sizing: border-box;
// `
