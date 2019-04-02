import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  processedRemindersSelector,
  currentMonthSelector,
} from '../selectors/calendar'
import {
  prevMonth,
  nextMonth,
} from '../reducers/actions'
import { Link } from 'react-router-dom';


const CalendarWrapper = styled.table`
  width: 100vw;
  height: 100vh;
  border: 1px solid #f3f3f3;
  font-size: 1.6rem;
  border-collapse: collapse;
`

const HeaderRow = styled.tr`
  height: 3rem;
  text-transform: capitalize;
`

const DayHeaderRow = styled(HeaderRow)`
  background-color: steelblue;
  color: white;
`

const DayHeaderContainer = styled.th`
  width: 14.2857%;
`


const WeekContainer = styled.tr`
  min-height: 5rem;
  border: 1px solid transparent;
`

const DayContainerTd = styled.td`
  color: ${props => props.weekend ? 'steelblue' : 'black'};
  position: relative;
  background-color: ${props => props.dayDisabled ? '#f3f3f3' : 'white'};
  transition: .3s background-color ease-out;
  &:hover {
    background-color: #f3f3f3;
  }
`

const DayText = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
`

const ReminderContainer = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
`

const Reminder = styled(Link)`
  font-size: 1rem;
  color: ${props => props.color || 'black'};
  cursor: pointer;
  text-decoration: none;
  display: block;
  transition: .2s transform ease-out;
  &:hover {
    transform: scale(1.2);
  }
`

const NavButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 2.5rem;
  width: 100%;
  &:hover, &:active {
    background-color: #f3f3f3;
  }
`

const DayContainer = ({
  weekend,
  day,
  isCurrentMonth,
  reminders,
}) => (
    <DayContainerTd colspan="1" weekend={weekend} dayDisabled={!isCurrentMonth}>
      <DayText>{day}</DayText>
      {reminders.length > 0 && <ReminderContainer>
        {reminders.map(r =>
          <Reminder key={r.id} color={r.color} to={`/edit-reminder/${r.id}`}>
            {r.reminder}
          </Reminder>)}
      </ReminderContainer>}
    </DayContainerTd>
  );

const Calendar = ({
  reminders,
  currentMonth,
  prevMonth,
  nextMonth }) => (
    <CalendarWrapper>
      <thead>
        <HeaderRow>
          <th>
            <NavButton onClick={prevMonth}>{"«"}</NavButton>
          </th>
          <th colSpan="5">{currentMonth}</th>
          <th>
            <NavButton onClick={nextMonth}>{"»"}</NavButton>
          </th>
        </HeaderRow>
        <DayHeaderRow>
          <DayHeaderContainer>Sunday</DayHeaderContainer>
          <DayHeaderContainer>Monday</DayHeaderContainer>
          <DayHeaderContainer>Tuesday</DayHeaderContainer>
          <DayHeaderContainer>Wednesday</DayHeaderContainer>
          <DayHeaderContainer>Thursday</DayHeaderContainer>
          <DayHeaderContainer>Friday</DayHeaderContainer>
          <DayHeaderContainer>Saturday</DayHeaderContainer>
        </DayHeaderRow>
      </thead>
      <tbody>
        {reminders.map(r =>
          <WeekContainer key={r.week}>
            {r.days.map(d =>
              <DayContainer
                key={d.formattedDay}
                weekend={d.isWeekend}
                isCurrentMonth={d.isCurrentMonth}
                day={d.formattedDay}
                reminders={d.reminders} />
            )}
          </WeekContainer>
        )}
      </tbody>
    </CalendarWrapper>
  );

const mapStateToProps = state => ({
  reminders: processedRemindersSelector(state),
  currentMonth: currentMonthSelector(state),
});

const mapDispatchToProps = dispatch => ({
  prevMonth: () => dispatch(prevMonth()),
  nextMonth: () => dispatch(nextMonth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
