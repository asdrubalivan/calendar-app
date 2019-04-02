import React from 'react';
import { EditReminderForm } from '../editreminderform';
import ReminderForm from '../reminderform';
import { mount } from 'enzyme';

describe('Add Reminder Form', () => {
  it('should update when an input is changed', async () => {
    const onSubmit = jest.fn();
    const reminder = {
      id: '123',
      reminder: 'reminder',
      date: '2019-04-01T04:00:00.000Z',
      color: '#fafafa',
    }
    const match = {
      params: {
        id: '123',
      }
    };
    const tree = mount(<EditReminderForm onSubmit={onSubmit} reminder={reminder} match={match} />);
    await tree.find(ReminderForm)
      .find('input[name="reminder"]')
      .simulate('change', {
        persist: () => { },
        target: {
          name: 'reminder',
          value: 'reminder1',
        }
      });
    const reminderValue = tree
      .find(ReminderForm)
      .find('input[name="reminder"]')
      .props().value;
    expect(reminderValue).toEqual('reminder1');
    const date = tree
      .find(ReminderForm)
      .find('input[name="date"]')
      .props().value;
    expect(date).toEqual('2019-04-01T04:00:00.000Z');
    await tree.props().onSubmit();
    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit.mock.calls).toHaveLength(1);
  });
  it('should show errors and disables button if form is invalid', (done) => {
    const onSubmit = jest.fn();
    const reminder = {
      id: '123',
      reminder: 'reminder',
      date: '2019-04-01T04:00:00.000Z',
      color: '#fafafa',
    }
    const match = {
      params: {
        id: '123',
      }
    };
    const tree = mount(<EditReminderForm onSubmit={onSubmit} reminder={reminder} match={match} />);
    tree.find(ReminderForm)
      .find('input[name="reminder"]')
      .simulate('change', {
        persist: () => { },
        target: {
          name: 'reminder',
          value: '',
        }
      });
    tree.find(ReminderForm)
      .find('input[name="color"]')
      .simulate('change', {
        persist: () => { },
        target: {
          name: 'color',
          value: 'invalid',
        }
      });
    tree.find('form').simulate('submit', {
      preventDefault: () => { },
    });
    setTimeout(() => {
      tree.update();
      expect(tree.find(ReminderForm).props().errors).toMatchObject({
        color: 'Color should match an hexadecimal number [#000, #fafafa]',
        reminder: 'A reminder is required',
      });
      done();
    }, 0)
  })
});
