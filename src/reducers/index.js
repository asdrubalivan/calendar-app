import { combineReducers } from 'redux';
import CalendarReducer from './calendar'
import ReminderReducer from './reminder'

export default combineReducers({
  reminders: ReminderReducer,
  calendar: CalendarReducer,
});
