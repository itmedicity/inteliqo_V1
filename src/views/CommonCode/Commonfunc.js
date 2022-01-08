import 'react-toastify/dist/ReactToastify.css';
import { Flip, toast } from 'react-toastify';
import moment from 'moment';

export const succesNofity = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

export const errorNofity = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

export const warningNofity = (message) => toast.warning(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

export const infoNofity = (message) => toast.info(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

//Get Total Shift Hours In Minits
export const getTotalShiftHours = (x, y) => {
    if (x.isValid() && y.isValid()) {
        const duration = moment.duration(y.diff(x));
        const minits = duration.asMinutes()
        return minits;
    }
    return 0;
}

//Gte Total Worked Hours In Minits
export const getTotalMinitsWorked = (x, y) => {
    if (x.isValid() && y.isValid()) {
        const duration = moment.duration(y.diff(x));
        const minits = duration.asMinutes()
        return minits;
    }
    return 0;
}