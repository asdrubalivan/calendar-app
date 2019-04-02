import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

/*
  This is a workaround due to a possible bug on react-formik-ui
  that affects testing with the library
 */
jest.mock('react-formik-ui', () => ({
  Datepicker: ({ name, value, className }) => (
    <input name={name} type="text" className={className} value={value} onChange={() => console.log('onChange')} />
  ),
}));
