import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import ToDoList from './components/ToDoList';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700;800&display=swap');

  * {
    box-sizing: border-box;
  }

  html {
    min-width: 320px;
    background: #f3f5f8;
  }

  body {
    min-width: 320px;
    margin: 0;
    line-height: 1;
    background: #f3f5f8;
    color: #1f2933;
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  }

  button,
  input {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
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
