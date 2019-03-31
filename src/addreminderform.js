import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { addReminder } from './reducers/actions'
import { Datepicker } from 'react-formik-ui';
import { utc as moment } from 'moment';

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

const ColorDiv = styled.div`
  width: 1rem;
  display: inline-block;
`

const FORMAT_DATE_PICKER = 'yyyy-MM-dd p';

const getColor = (color, errors) => !errors ? color : 'white';

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
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={this.onSubmit}>
        {({ errors,
          touched,
          values,
          isSubmitting,
          isValid,
        }) => (
            <Form>
              <label htmlFor="reminder">Reminder</label>
              <Field name="reminder" />
              {errors.reminder && touched.reminder && <p>{errors.reminder}</p>}
              <label htmlFor="color">Color</label>
              <Field name="color" />
              <ColorDiv style={{ backgroundColor: getColor(values.color, errors.color) }} />
              {errors.color && touched.color && <p>{errors.color}</p>}
              <label htmlFor="date">Date</label>
              <Datepicker
                showTimeSelect
                dateFormat={FORMAT_DATE_PICKER}
                required={true}
                onChange={(ev) => console.log('change', ev)}
                name="date" />
              {errors.date && touched.date && <p>{errors.date}</p>}
              <button disabled={isSubmitting || !isValid} type="submit">Create reminder</button>
            </Form>
          )}
      </Formik>
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
