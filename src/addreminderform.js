import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

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

const getColor = (color, errors) => !errors ? color : 'white';

class AddReminderForm extends Component {
  render() {
    const initialValues = {
      reminder: '',
      color: '#000000',
    }
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}>
        {({ errors, touched, values }) => (
          <Form>
            <label htmlFor="reminder">Reminder</label>
            <Field name="reminder" />
            {errors.reminder && touched.reminder && <p>{errors.reminder}</p>}
            <label htmlFor="color">Color</label>
            <Field name="color" />
            <ColorDiv style={{ backgroundColor: getColor(values.color, errors.color) }} />
            {errors.color && touched.color && <p>{errors.color}</p>}
            <label htmlFor="date">Date</label>
            <Field name="date" />
            {errors.date && touched.date && <p>{errors.date}</p>}
          </Form>
        )}
      </Formik>
    );
  }
}

export default AddReminderForm;
