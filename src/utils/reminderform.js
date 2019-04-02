import * as Yup from 'yup';
import styled from 'styled-components';

export const validationSchema = Yup.object().shape({
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

export const Title = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin: 1.8rem;
`
