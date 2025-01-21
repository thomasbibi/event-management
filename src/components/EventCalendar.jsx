import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addRSVPEvent } from "../slices/profileSlice";

const EventCalendar = ({ events }) => {
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);

  const calendarEvents = useMemo(() => {
    return events.map((event) => ({
      id: event.id, // Pass the event ID for unique identification
      title: event.eventName,
      start: new Date(event.date),
      end: new Date(event.date),
      allDay: true,
      description: event.description,
      img: event.img,
    }));
  }, [events]);

  const handleEventSelect = (event) => {
    dispatch(
      addRSVPEvent({
        id: event.id,
        eventName: event.title,
        date: event.start,
        description: event.description,
        img: event.img,
      })
    );
    alert(`You have RSVPed to ${event.title}`);
  };

  return (
    <div style={{ height: "80vh", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventSelect}
        style={{ backgroundColor: "#fff", borderRadius: "8px" }}
      />
    </div>
  );
};

export default EventCalendar;
