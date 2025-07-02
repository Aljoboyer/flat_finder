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
            required: 'Please enter valid NID number',
            min: 4
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
]