import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import ToDoList from './components/ToDoList';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');


  * {
    box-sizing: border-box;
  }

  body {
    line-height: 1;
    font-family: 'Source Sans Pro', sans-serif;

  }
  a {
    text-decoration: none;
    color:inherit;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
