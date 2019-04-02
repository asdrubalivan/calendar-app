import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'formik';
import { Datepicker } from 'react-formik-ui';

const Label = styled.label`
  font-size: 1.6rem;
  margin-right: 1rem;
  margin-left: 1rem;
  line-height: 3.5rem;
`

const Group = styled.div`
  width: 35rem;
  height: 3.5rem;
  margin-right: auto;
  margin-left: auto;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

const MyDatePicker = styled(Datepicker)`
  display: inline-block;
`

const ColumnBase = styled.div`
  display: inline-block;
  height: 100%;
  vertical-align: top;
  input, .form-element, .datePicker-wrapper, .react-datepicker-wrapper, .react-datepicker__input-container {
    height: 100%;
    width: 17rem;
  }
`

const Column = styled(ColumnBase)`
  width: 20rem;
`

const LabelColumn = styled(ColumnBase)`
  width: 10rem;
`

const SmallColumn = styled.div`
  width: 3.5rem;
  display: inline-block;
  height: 100%;
`


const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: 1.2rem;
`

const SubmitButton = styled.button`
  width: 17rem;
  padding: .5rem;
`

const StyledForm = styled(Form)`
  padding: 1rem;
`

const FORMAT_DATE_PICKER = 'yyyy-MM-dd p';

const ReminderForm = ({
  errors,
  touched,
  isSubmitting,
  isValid,
  values,
  submitText,
}) => (
    <StyledForm>
      <Group>
        <LabelColumn>
          <Label htmlFor="reminder">Reminder</Label>
        </LabelColumn>
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
        <LabelColumn>
          <Label htmlFor="color">Color</Label>
        </LabelColumn>
        <Column>
          <Field name="color" />
        </Column>
        <SmallColumn style={{ backgroundColor: !errors.color && values.color }} />
      </Group>
      {errors.color && touched.color && <Group>
        <ErrorMessage>
          {errors.color}
        </ErrorMessage>
      </Group>}
      <Group>
        <LabelColumn>
          <Label htmlFor="date">Date</Label>
        </LabelColumn>
        <Column>
          <MyDatePicker
            showTimeSelect
            dateFormat={FORMAT_DATE_PICKER}
            required={true}
            value={values.date}
            name="date" />
        </Column>
      </Group>
      {errors.date && touched.date && <Group>
        <ErrorMessage>
          {errors.date}
        </ErrorMessage>
      </Group>}
      <Group>
        <LabelColumn />
        <Column>
          <SubmitButton
            disabled={isSubmitting || !isValid}
            type="submit">{submitText}</SubmitButton>
        </Column>
      </Group>
    </StyledForm>
  );

export default ReminderForm;
