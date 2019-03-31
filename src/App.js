import React, { Component } from 'react';
import { connect } from 'react-redux';
import { utc as moment } from 'moment';
import GlobalStyle from './globalstyle'
import { setDate } from './reducers/actions';
import { Switch, Route } from 'react-router';
import Calendar from './calendar';
import AddReminderForm from './addreminderform';

class App extends Component {
  componentDidMount() {
    this.props.setDate();
  }
  render() {
    return (
      <>
        <GlobalStyle />
        <main>
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
