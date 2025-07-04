import { cities } from "../dropdownData";
import { emailRegex, nameRegex, passwordRegex, phoneRegex } from "./regexData";

export const profileFormConfigs =  [
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
        inputType: 'textfield',
        value: "",
    },
    {
        field_id: 'phone',
        label: 'Phone',
        placeholder: 'Enter your phone',
         required:{
            required: 'Enter valid phone number',
            pattern: {
                value: phoneRegex,
                message: "Enter phone number without special character & later",
            }
        },
        inputType: 'textfield',
        value: "",
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
        inputType: 'textfield',
        value: "",
    },
    {
        options: cities,
        label: 'City Name',
        inputType: 'autocomplete',
        value: "",
        field_id: 'city',
    },
    {
        options: [],
        label: 'Area Name',
        inputType: 'autocomplete',
        field_id: 'areaName',
        suggestionText: "Select City First",
        value: "",
        
    },
    {
        field_id: 'nidNo',
        label: 'NID No.',
        placeholder: 'Enter your NID number',
         required:{
            required: 'Enter valid NID number',
            min: 4
        },
        inputType: 'textfield',
        value: "",
    },
    {
        field_id: 'propertyName',
        label: 'Property Name',
        placeholder: 'Enter your Property Name',
         required:{
            required: 'Enter valid Property Name',
            min: 4
        },
        inputType: 'textfield',
        value: "",
    },
]

export const settingsFormConfigs =  [
   
    {
        field_id: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
         required:{
            required: 'Enter valid password',
            pattern: {
                // value: passwordRegex,
                message: "Enter valid password",
            }
        },
        inputType: 'password'
    },
     {
        field_id: 'newPassword',
        label: 'New Password',
        placeholder: 'Enter your new password',
         required:{
            required: 'Enter valid password',
            pattern: {
                // value: passwordRegex,
                message: "Enter valid password",
            }
        },
        inputType: 'password'
    },
     {
        field_id: 'newPassword_2',
        label: 'Re-Enter New Password',
        placeholder: 'Re Enter your new password',
         required:{
            required: 'Enter valid password',
            pattern: {
                // value: passwordRegex,
                message: "Enter valid password",
            }
        },
        inputType: 'password'
    },
    
]