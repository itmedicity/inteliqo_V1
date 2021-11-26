import * as yup from 'yup';

export const loginFormValidation = yup.object().shape({
    emp_username: yup.string().required("Username is required").min(2),
    emp_password: yup.string().required("Password is required")
});

export const departmentMastValidation = yup.object().shape({
    dept_name: yup.string().required("Department Name is Required").min(3).max(45),
    dept_alias: yup.string().required("Department Short Name is Required").min(1).max(5),
});
