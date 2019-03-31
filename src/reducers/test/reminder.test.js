import reducer from '../reminder';
import { addReminder, editReminder } from '../actions'

describe('reminder reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  });
  it('should add reminders', () => {
    const toAdd = {
      reminder: 'r',
      date: '2019-01-01T00:00:00Z',
      color: '#123123',
    };
    const state = [
      {
        reminder: 'a',
        date: '2018-01-01T00:00:00Z',
        color: '#123123',
        id: '12',
      },
      {
        reminder: 'b',
        date: '2017-01-01T00:00:00Z',
        color: '#1231235',
        id: '1',
      },
    ]
    const result = reducer(state, addReminder(toAdd));
    expect(result[2]).toMatchObject({
      reminder: 'r',
      date: '2019-01-01T00:00:00Z',
      color: '#123123',
      id: expect.any(String),
    });
    expect(result.length).toBe(3);
    expect(result[0]).toMatchObject(state[0]);
    expect(result[1]).toMatchObject(state[1]);
  })
  it('should edit reminders', () => {
    const state = [
      {
        reminder: 'a',
        date: '2018-01-01T00:00:00Z',
        color: '#123123',
        id: '123',
      },
      {
        reminder: 'b',
        date: '2017-01-01T00:00:00Z',
        color: '#1231235',
        id: '12',
      },
      {
        reminder: 'c',
        date: '2017-01-01T00:00:00Z',
        color: '#1231235',
        id: '1234',
      },
    ]
    const toEdit = {
      reminder: 'new value',
      color: 'black',
      date: '2017-01-01T00:00:00Z',
    }
    const result = reducer(state, editReminder('123', toEdit));
    expect(result[0]).toMatchObject(state[1]);
    expect(result[1]).toMatchObject(state[2]);
    expect(result[2]).toMatchObject({
      ...toEdit,
      id: '123',
    });
    expect(result.length).toBe(3);
  })
});
