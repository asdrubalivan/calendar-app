import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addReminder } from './reducers/actions'
import { utc as moment } from 'moment';
import styled from 'styled-components';
import ReminderForm from './reminderform';

const validationSchema = Yup.object().shape({
  color: Yup
    .string()
    .default('#000000')
    .trim()
    .lowercase()
    .matches(/^#([a-f0-9]{3}|[a-f0-9]{6})$/, 'Color should match an hexadecimal number [#000, #fafafa]'),
  reminder: Yup
    .string()
    .required('A reminder is required')
    .max(30, 'No more than 30 characters are allowed'),
  date: Yup.date().required('A date is required'),
});

const Title = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin: 1.8rem;
`

class AddReminderForm extends Component {
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

export default connect(null, mapDispatchToProps)(AddReminderForm);
