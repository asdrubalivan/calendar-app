import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'formik';
import { Datepicker } from 'react-formik-ui';

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

const ReminderForm = ({ errors, touched, isSubmitting, isValid }) => (
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
);

export default ReminderForm;
