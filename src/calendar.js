import React from 'react';
import styled from 'styled-components';

const CalendarWrapper = styled.table`
  width: 91vw;
  height: 90vh;
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

const reminders = [
  {
    date: '2019-01-02 12:00:00',
    reminder: 'blablablablablablablablablabla',
    color: '#211121',
    id: 'test', // Esto para identificar los reminders por si borramos alguno etc
  },
  {
    date: '2019-01-02 12:00:00',
    reminder: 'blablablablablablablablablabla',
    color: '#f1f1e6',
    id: 'test', // Esto para identificar los reminders por si borramos alguno etc
  },
  {
    date: '2019-01-02 12:00:00',
    reminder: 'blablablablablablablablablabla',
    color: '#211121',
    id: 'test', // Esto para identificar los reminders por si borramos alguno etc
  },
  {
    date: '2019-01-02 12:00:00',
    reminder: 'blablablablablablablablablabla',
    color: '#211121',
    id: 'test', // Esto para identificar los reminders por si borramos alguno etc
  },
  {
    date: '2019-01-02 12:00:00',
    reminder: 'blablablablablablablablablabla',
    color: '#211121',
    id: 'test', // Esto para identificar los reminders por si borramos alguno etc
  },
  {
    date: '2019-01-02 12:00:00',
    reminder: 'blablablablablablablablablabla',
    color: 'green',
    id: 'test', // Esto para identificar los reminders por si borramos alguno etc
  },
  {
    date: '2019-01-02 12:00:00',
    reminder: 'blablablablablablablablablabla',
    color: '#211121',
    id: 'test', // Esto para identificar los reminders por si borramos alguno etc
  },
  {
    date: '2019-01-02 12:00:00',
    reminder: 'blablablablablablablablablabla',
    color: '#211121',
    id: 'test', // Esto para identificar los reminders por si borramos alguno etc
  },
  {
    date: '2019-01-02 12:00:00',
    reminder: 'blablablablablablablablablabla',
    color: '#211121',
    id: 'test', // Esto para identificar los reminders por si borramos alguno etc
  },
]

const Reminder = styled.p`
  font-size: 1rem;
  color: ${props => props.color || 'black'};
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
  dayDisabled,
}) => (
    <DayContainerTd weekend={weekend} dayDisabled={dayDisabled}>
      <DayText>{day}</DayText>
      <ReminderContainer>
        {reminders.map(r => <Reminder key={r.id} color={r.color}>
          {r.reminder}
        </Reminder>)}
      </ReminderContainer>
    </DayContainerTd>
  );

const Calendar = () => (
  <CalendarWrapper>
    <thead>
      <HeaderRow>
        <th>
          <NavButton>{"«"}</NavButton>
        </th>
        <th colspan="5">Mars 2019</th>
        <th>
          <NavButton>{"»"}</NavButton>
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
      <WeekContainer>
        <DayContainer day={30} weekend dayDisabled></DayContainer>
        <DayContainer day={31} dayDisabled>31</DayContainer>
        <DayContainer day={1}></DayContainer>
        <DayContainer day={2}>2</DayContainer>
        <DayContainer day={3}>3</DayContainer>
        <DayContainer day={4}>4</DayContainer>
        <DayContainer day={5}>5</DayContainer>
      </WeekContainer>
      <WeekContainer>
        <DayContainer day={6}>6</DayContainer>
        <DayContainer day={7}>7</DayContainer>
        <DayContainer day={8}>8</DayContainer>
        <DayContainer day={9}>9</DayContainer>
        <DayContainer day={10}>10</DayContainer>
        <DayContainer day={11}>11</DayContainer>
        <DayContainer day={12}>12</DayContainer>
      </WeekContainer>
      <WeekContainer>
        <DayContainer day={13}>13</DayContainer>
        <DayContainer day={14}>14</DayContainer>
        <DayContainer day={15}>15</DayContainer>
        <DayContainer day={16}>16</DayContainer>
        <DayContainer day={17}>17</DayContainer>
        <DayContainer day={18}>18</DayContainer>
        <DayContainer day={19}>19</DayContainer>
      </WeekContainer>
      <WeekContainer>
        <DayContainer day={20}>20</DayContainer>
        <DayContainer day={21}>21</DayContainer>
        <DayContainer day={22}>22</DayContainer>
        <DayContainer day={23}>23</DayContainer>
        <DayContainer day={24}>24</DayContainer>
        <DayContainer day={25}>25</DayContainer>
        <DayContainer day={26}>26</DayContainer>
      </WeekContainer>
      <WeekContainer>
        <DayContainer day={27}>27</DayContainer>
        <DayContainer day={28}>28</DayContainer>
        <DayContainer day={29}>29</DayContainer>
        <DayContainer day={30}>30</DayContainer>
        <DayContainer day={31}>31</DayContainer>
        <DayContainer day={1} dayDisabled>1</DayContainer>
        <DayContainer day={2} dayDisabled>2</DayContainer>
      </WeekContainer>
    </tbody>
  </CalendarWrapper>
);

export default Calendar;
