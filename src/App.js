import React, { Component } from 'react';
import { connect } from 'react-redux';
import { utc as moment } from 'moment';
import GlobalStyle from './globalstyle'
import { setDate } from './reducers/actions';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Calendar from './calendar';
import AddReminderForm from './addreminderform';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin: 2rem;
`

class App extends Component {
  componentDidMount() {
    this.props.setDate();
  }
  render() {
    return (
      <>
        <GlobalStyle />
        <main>
          <Title>Calendar App</Title>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/add-reminder">Add reminder</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Calendar} />
            <Route exact path="/add-reminder" component={AddReminderForm} />
          </Switch>
        </main>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setDate: () => dispatch(setDate(moment().toISOString())),
});

export default connect(null, mapDispatchToProps)(App);
