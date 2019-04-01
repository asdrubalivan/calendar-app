import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { addReminder } from './reducers/actions'
import { utc as moment } from 'moment';
import ReminderForm from './reminderform';
import { validationSchema, Title } from './utils/reminderform';

class EditReminderForm extends Component {
  onSubmit = (values) => {
    this.props.onSubmit(values);
    this.props.history.push('/');
  }
  render() {
    const initialValues = {
      reminder: '',
      color: '#000000',
    }
    return (
      <>
        <Title>Add new reminder</Title>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={this.onSubmit}>
          {({ errors,
            touched,
            isSubmitting,
            isValid,
          }) => (
              <ReminderForm errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                isValid={isValid}
              />
            )}
        </Formik>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    const m = moment(values.date);
    m.subtract(values.date.getTimezoneOffset(), 'minutes')
    values.date = m.toISOString();
    dispatch(addReminder(values))
  },
});

export default connect(null, mapDispatchToProps)(EditReminderForm);
