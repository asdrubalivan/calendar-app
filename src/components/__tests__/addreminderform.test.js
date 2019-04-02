import React from 'react';
import { AddReminderForm } from '../addreminderform';
import ReminderForm from '../reminderform';
import { mount } from 'enzyme';

describe('Add Reminder Form', () => {
  it('should update when an input is changed', async () => {
    const onSubmit = jest.fn();
    const tree = mount(<AddReminderForm onSubmit={onSubmit} />);
    tree.find(ReminderForm)
      .find('input[name="reminder"]')
      .simulate('change', {
        persist: () => { },
        target: {
          name: 'reminder',
          value: 'test',
        }
      });
    const newValue = tree
      .find(ReminderForm)
      .find('input[name="reminder"]')
      .props().value;
    expect(newValue).toEqual('test');
    await tree.props().onSubmit();
    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit.mock.calls).toHaveLength(1);
  });
});
