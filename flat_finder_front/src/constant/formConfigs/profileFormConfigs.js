import { cities } from "../dropdownData";
import { emailRegex, nameRegex, passwordRegex, phoneRegex } from "./regexData";

export const profileFormConfigs =  [
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
        inputType: 'textfield',
        value: "",
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
        inputType: 'textfield',
        value: "",
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
            required: 'Please enter valid NID number',
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
            required: 'Please enter valid Property Name',
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
            required: 'Please enter valid password',
            pattern: {
                // value: passwordRegex,
                message: "Please enter valid password",
            }
        },
        inputType: 'password'
    },
     {
        field_id: 'new_password',
        label: 'New Password',
        placeholder: 'Enter your new password',
         required:{
            required: 'Please enter valid password',
            pattern: {
                // value: passwordRegex,
                message: "Please enter valid password",
            }
        },
        inputType: 'password'
    },
     {
        field_id: 'new_password_2',
        label: 'Re-Enter New Password',
        placeholder: 'Re Enter your new password',
         required:{
            required: 'Please enter valid password',
            pattern: {
                // value: passwordRegex,
                message: "Please enter valid password",
            }
        },
        inputType: 'password'
    },
    
]