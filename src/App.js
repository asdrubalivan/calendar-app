import React, { Component } from 'react';
import { connect } from 'react-redux';
import { utc as moment } from 'moment';
import GlobalStyle from './globalstyle'
import { setDate } from './reducers/actions';
import Calendar from './calendar';

class App extends Component {
  componentDidMount() {
    this.props.setDate();
  }
  render() {
    return (
      <>
        <GlobalStyle />
        <Calendar />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setDate: () => dispatch(setDate(moment().toISOString())),
});

export default connect(null, mapDispatchToProps)(App);
