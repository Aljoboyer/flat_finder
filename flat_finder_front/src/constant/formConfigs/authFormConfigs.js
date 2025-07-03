import { emailRegex, nameRegex, passwordRegex, phoneRegex } from "./regexData";

export const authFormFields =  [
    {
        field_id: 'name',
        label: 'Name',
        placeholder: 'Enter your name',
        required:{
            required: 'Please Enter Your Name',
            pattern: {
                value: nameRegex,
                message: "Please enter name without special character or number",
            }
        },
        inputType: 'textfield'
    },
    {
        field_id: 'phone',
        label: 'Phone',
        placeholder: 'Enter your phone',
         required:{
            required: 'Please enter valid phone number',
            pattern: {
                value: phoneRegex,
                message: "Please enter valid phone number",
            }
        },
        inputType: 'textfield'
    },
    {
        field_id: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
         required:{
            required: 'Please Enter Valid Email',
            pattern: {
                value: emailRegex,
                message: "Please Enter Valid Email",
            }
        },
        inputType: 'textfield'
    },
    {
        field_id: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
         required:{
            required: 'Please enter password',
            pattern: {
                // value: passwordRegex,
                message: "Please enter valid password",
            }
        },
        inputType: 'password'
    },
    {
        field_id: 'nidNo',
        label: 'NID No.',
        placeholder: 'Enter your NID number',
         required:{
            required: 'Please enter valid NID number',
            min: 4
        },
        inputType: 'textfield'
    },
    {
        field_id: 'propertyName',
        label: 'Property Name',
        placeholder: 'Enter your Property Name',
         required:{
            required: 'Please enter valid Property Name',
            min: 4
        },
        inputType: 'textfield'
    },
]