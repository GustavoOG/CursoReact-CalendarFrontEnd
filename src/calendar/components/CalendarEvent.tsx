import { EventProps } from "react-big-calendar";
import { CalendarDay } from "..";

export const CalendarEvent = ({
  event,
}: any | React.ComponentType<EventProps<CalendarDay>>) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>

      <span> - {user.name}</span>
    </>
  );
};
