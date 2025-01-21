import React, { useEffect } from "react";
import EventCalendar from "../components/EventCalendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../slices/eventsSlice";

const Calender = () => {
    const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Event Calendar</h1>
      <EventCalendar events={events} />
    </div>
  );
};

export default Calender;
