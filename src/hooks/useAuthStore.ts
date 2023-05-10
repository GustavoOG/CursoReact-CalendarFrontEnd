import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();


    const starLogin = async ({ email, password }: any) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', (new Date().getTime()).toString());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout('Credenciales Incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const starRegister = async ({ name, email, password }: any) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', (new Date().getTime()).toString());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error: any) {
            console.log(error);

            dispatch(onLogout(error.response.data?.msg || '--'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }



    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout(undefined));

        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', (new Date().getTime()).toString());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout(undefined));
        }
    }
    const starLogout = () => {

        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout(undefined));
    }
    
    return {
        //*Propiedades
        status,
        user,
        errorMessage,
        //*Métodos
        starLogin,
        starRegister,
        checkAuthToken,
        starLogout
    }
}