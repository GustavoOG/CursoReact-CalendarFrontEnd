import { parseISO } from 'date-fns';

export const convertEventsToDateEvents = (events = []) => {
    return events.map((event: any) => {
        event.start = parseISO(event.start);
        event.end = parseISO(event.end);
        return event;
    });

}