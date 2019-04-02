import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { editReminder } from '../reducers/actions'
import ReminderForm from './reminderform';
import { validationSchema, Title } from '../utils/reminderform';
import { Redirect } from 'react-router-dom';
import { subtractTimezone, addTimezone } from '../utils/date';

export class EditReminderForm extends Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
    this.props.history.push('/');
  }
  render() {
    const { reminder } = this.props;
    if (!reminder) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Title>Edit Reminder</Title>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ ...reminder }}
          onSubmit={this.onSubmit}>
          {({ errors,
            touched,
            isSubmitting,
            isValid,
            values,
          }) => (
              <ReminderForm errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                isValid={isValid}
                values={values}
                submitText="Edit reminder"
              />
            )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  reminder: addTimezone(state.reminders.find(r => r.id === props.match.params.id)),
});

const mapDispatchToProps = (dispatch, props) => ({
  onSubmit: (values) => dispatch(editReminder(props.match.params.id, subtractTimezone(values))),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditReminderForm);
