import { useSelector, useDispatch } from 'react-redux';
import { RootState, onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { CalendarDay } from '../calendar';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
    const { user } = useSelector((state: RootState) => state.auth);

    const setActiveEvent = (calendarEvent: CalendarDay) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent: CalendarDay) => {
        try {

            //Todo bien
            if (calendarEvent.id) {
                //Actualiza
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                return;
            }

            //Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
        } catch (error: any) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg)
        }
    }

    const startDeletingEvent = async () => {
        // TODO: llegar al backend
        try {

            await calendarApi.delete(`/events/${activeEvent?.id}`);
            dispatch(onDeleteEvent());
            return;
        } catch (error: any) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg)
        }

    }

    const starLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
            //console.log(events);
        } catch (error) {
            console.log((error));
        }
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //*Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        starLoadingEvents
    }
}
