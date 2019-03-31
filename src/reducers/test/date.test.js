import reducer from '../calendar';
import { setDate, nextMonth, prevMonth } from '../actions';

const getInitialState = () => reducer(undefined, {});

describe('date reducer', () => {
  const date = '2019-04-01T04:00:00.000Z';
  it('creates a default state', () => {
    const result = getInitialState();
    expect(result).toMatchObject({
      date: null,
      calendarDate: null,
      days: [],
    });
  });
  it('creates an array of days based on the date', () => {
    const initialState = getInitialState();
    const result = reducer(initialState, setDate(date));
    expect(result.date).toBe(date);
    expect(result.calendarDate).toBe(date);
    expect(result.days).toMatchSnapshot('days');
  });
  it('goes to next month', () => {
    const initialState = reducer(getInitialState(), setDate(date));
    const result = reducer(initialState, nextMonth());
    expect(result.date).toBe(date);
    expect(result.calendarDate).toBe('2019-05-01T00:00:00.000Z');
    expect(result.days).toMatchSnapshot('next month 1st');
    const secondMonth = reducer(result, nextMonth());
    expect(secondMonth.date).toBe(date);
    expect(secondMonth.calendarDate).toBe('2019-06-01T00:00:00.000Z');
    expect(secondMonth.days).toMatchSnapshot('next month 2nd');
  });
  it('goes to previous month', () => {
    const initialState = reducer(getInitialState(), setDate(date));
    const result = reducer(initialState, prevMonth());
    expect(result.date).toBe(date);
    expect(result.calendarDate).toBe('2019-03-01T00:00:00.000Z');
    expect(result.days).toMatchSnapshot('prev month 1st');
    const secondMonth = reducer(result, prevMonth());
    expect(secondMonth.date).toBe(date);
    expect(secondMonth.calendarDate).toBe('2019-02-01T00:00:00.000Z');
    expect(secondMonth.days).toMatchSnapshot('prev month 2nd');
  });
});
