import React, { Component } from 'react';
import GlobalStyle from './globalstyle'
import Calendar from './calendar';

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Calendar />
      </>
    );
  }
}

export default App;
