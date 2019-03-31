import {
  SET_DATE,
  PREV_MONTH,
  NEXT_MONTH,
} from './actions';
import {
  getDaysMonth,
  getNextMonth,
  getPrevMonth,
  getFirstDayNextMonth,
  getFirstDayPrevMonth,
} from '../utils/date';

const reducer = (state, action) => {
  if (!state) {
    return {
      date: null,
      calendarDate: null,
      days: [],
    };
  }
  switch (action.type) {
    case SET_DATE:
      return {
        date: action.date,
        calendarDate: action.date,
        days: getDaysMonth(action.date),
      };
    case PREV_MONTH:
      return {
        ...state,
        calendarDate: getFirstDayPrevMonth(state.calendarDate),
        days: getPrevMonth(state.calendarDate),
      };
    case NEXT_MONTH:
      return {
        ...state,
        calendarDate: getFirstDayNextMonth(state.calendarDate),
        days: getNextMonth(state.calendarDate),
      };
    default:
      return state;
  }
};

export default reducer;
