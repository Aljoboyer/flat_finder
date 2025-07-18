import { emailRegex, nameRegex, passwordRegex, phoneRegex } from "./regexData";

export const authFormFields =  [
    {
        field_id: 'name',
        label: 'Name',
        placeholder: 'Enter your name',
        required:{
            required: 'Enter Your Name',
            pattern: {
                value: nameRegex,
                message: "Enter name without special character or number",
            }
        },
        inputType: 'textfield'
    },
    {
        field_id: 'phone',
        label: 'Phone',
        placeholder: 'Enter your phone',
         required:{
            required: 'Enter valid phone number',
            pattern: {
                value: phoneRegex,
                message: "Enter valid phone number",
            }
        },
        inputType: 'textfield'
    },
    {
        field_id: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
         required:{
            required: 'Enter Valid Email',
            pattern: {
                value: emailRegex,
                message: "Enter Valid Email",
            }
        },
        inputType: 'textfield'
    },
    {
        field_id: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
         required:{
            required: 'Enter password',
            pattern: {
                // value: passwordRegex,
                message: "Enter valid password",
            }
        },
        inputType: 'password'
    },
    {
        field_id: 'nidNo',
        label: 'NID No.',
        placeholder: 'Enter your NID number',
         required:{
            required: 'Enter valid NID number',
            min: 4
        },
        inputType: 'textfield'
    },
    {
        field_id: 'propertyName',
        label: 'Property Name',
        placeholder: 'Enter your Property Name',
         required:{
            required: 'Enter valid Property Name',
            min: 4
        },
        inputType: 'textfield'
    },
]