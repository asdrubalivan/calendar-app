import React, { Component } from 'react';
import { connect } from 'react-redux';
import { utc as moment } from 'moment';
import GlobalStyle from './globalstyle'
import { setDate } from './reducers/actions';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Calendar from './components/calendar';
import AddReminderForm from './components/addreminderform';
import EditReminderForm from './components/editreminderform';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin: 5rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  text-transform: capitalize;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.6rem;
  border: 1px solid steelblue;
  border-radius: 3%;
  &:hover {
    background-color: #f3f3f3;
  }
  &, &:visited, &:active {
    color: black;
  }
`

const Nav = styled.nav`
  margin-bottom: 3rem;
  padding-left: 1rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
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
          <Nav>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/add-reminder">Add reminder</StyledLink>
          </Nav>
          <Switch>
            <Route exact path="/" component={Calendar} />
            <Route exact path="/add-reminder" component={AddReminderForm} />
            <Route exact path="/edit-reminder/:id" component={EditReminderForm} />
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
