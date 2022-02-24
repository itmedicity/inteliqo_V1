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

//Get Total Worked Hours In Minits
export const getTotalMinitsWorked = (x, y) => {
    if (x.isValid() && y.isValid()) {
        const duration = moment.duration(y.diff(x));
        const minits = duration.asMinutes()
        return minits;
    }
    return 0;
}

//Get Total Hours Worked Based on Check In and Check out with Specifiv Format (1 D:3 h : 30 m) 
export const getHoursWorked = (x, y) => {
    if (x.isValid() && y.isValid()) {
        const duration = moment.duration(y.diff(x));
        const days = duration.days();
        const hours = duration.hours();
        const minits = duration.minutes();
        return days === 0 ? `${hours} h:${minits} m` : `${days} D:${hours} h:${minits} m`;
    }
    return 0;
}

//GET DAYS BETWEEN TWO DAYS
export const getDayDiffrence = (x, y) => {
    if (x.isValid() && y.isValid()) {
        const daysDuration = moment.duration(y.diff(x));
        const days = daysDuration.asDays()
        return days;
    }
    return 0;
}