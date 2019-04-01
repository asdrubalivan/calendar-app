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

const Title = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin: 1.8rem;
`

const Label = styled.label`
  font-size: 1.6rem;
  margin-right: 1rem;
  margin-left: 1rem;
`

const Group = styled.div`
  max-width: 35rem;
  margin-right: auto;
  margin-left: auto;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

const MyDatePicker = styled(Datepicker)`
  display: inline-block;
`

const Column = styled.div`
  width: 10rem;
  display: inline-block;
`

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: 1.2rem;
`

const SubmitButton = styled.button`
  margin-left: 10rem;
  width: 19.1rem;
`

const FORMAT_DATE_PICKER = 'yyyy-MM-dd p';

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
              <Form>
                <Group>
                  <Column>
                    <Label htmlFor="reminder">Reminder</Label>
                  </Column>
                  <Column>
                    <Field name="reminder" />
                  </Column>
                </Group>
                {errors.reminder && touched.reminder && <Group>
                  <ErrorMessage>
                    {errors.reminder}
                  </ErrorMessage>
                </Group>}
                <Group>
                  <Column>
                    <Label htmlFor="color">Color</Label>
                  </Column>
                  <Column>
                    <Field name="color" />
                  </Column>
                </Group>
                {errors.color && touched.color && <Group>
                  <ErrorMessage>
                    {errors.color}
                  </ErrorMessage>
                </Group>}
                <Group>
                  <Column>
                    <Label htmlFor="date">Date</Label>
                  </Column>
                  <Column>
                    <MyDatePicker
                      showTimeSelect
                      dateFormat={FORMAT_DATE_PICKER}
                      required={true}
                      name="date" />
                  </Column>
                </Group>
                {errors.date && touched.date && <Group>
                  <ErrorMessage>
                    {errors.date}
                  </ErrorMessage>
                </Group>}
                <Group>
                  <SubmitButton disabled={isSubmitting || !isValid} type="submit">Create reminder</SubmitButton>
                </Group>
              </Form>
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
