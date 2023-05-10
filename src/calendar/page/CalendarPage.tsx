import { Calendar, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CalendarDay,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../";
import { localizer, getMessagesES } from "../../helpers";
import { CSSProperties, useEffect, useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";


export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, starLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const defaultView = Views[lastView as keyof typeof Views]
    ? Views[lastView as keyof typeof Views]
    : Views.WEEK;

  function eventStyleGetter(
    event: CalendarDay,
    _start: Date,
    _end: Date,
    _isSelected: boolean
  ): { className?: string | undefined; style?: CSSProperties | undefined } {
    //console.log({ event, start, end, isSelected });
    const isMyEvent = user?.uid === event.user?.uid;

    const style: CSSProperties = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return { style };
  }

  const onDoubleClick = (_event: CalendarDay) => {
    //console.log({ doubleClick: event });
    openDateModal();
  };

  const onSelect = (event: CalendarDay) => {
    //console.log({ click: event });
    setActiveEvent(event);
  };

  const onViewChanged = (event: View) => {
    //console.log({ viewChanged: event });
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    starLoadingEvents();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={defaultView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
