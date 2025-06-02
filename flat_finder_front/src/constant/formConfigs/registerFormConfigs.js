import { emailRegex, nameRegex } from "./regexData";

export const registerFormFields =  [
    {
        field_id: 'name',
        label: 'Name',
        placeHolder: 'Enter your name',
        required:{
            required: 'Please Enter Your Name',
            pattern: {
                value: nameRegex,
                message: "Please enter name without special character or number",
            }
        }
    },
        {
        field_id: 'email',
        label: 'Email',
        placeHolder: 'Enter your email',
         required:{
            required: 'Please Enter Valid Email',
            pattern: {
                value: emailRegex,
                message: "Please Enter Valid Email",
            }
        }

    },
]