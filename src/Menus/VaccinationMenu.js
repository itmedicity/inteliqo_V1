import { CNavItem } from "@coreui/react";
const VaccinationInfo = [
    {
        men_slno: 117,
        component: CNavItem,
        name: 'Vaccination Information',
        to: '/Home/VaccinationInfo',
    },

    {
        men_slno: 250,
        component: CNavItem,
        name: 'Vaccination Entry',
        to: '/Home/VaccinationEntry',
    },
    {
        men_slno: 253,
        component: CNavItem,
        name: 'Hic Verification ',
        to: '/Home/Hicverification',
    },
    {
        men_slno: 255,
        component: CNavItem,
        name: 'Hic Verified list ',
        to: '/Home/Hicverificationlist',
    },
]

export default VaccinationInfo;