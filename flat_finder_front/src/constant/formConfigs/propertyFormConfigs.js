import { cities } from "@/components/visitors/LandingPage/HeroSection";

export const propertyFormFields =  [
    {
        field_id: 'title',
        label: 'Title',
        placeholder: 'Enter property title',
        required:{
            required: 'Please Enter property title',
        },
        inputType: 'textfield'
    },
    {
        field_id: 'advanceMoney',
        label: 'Advance Money',
        placeholder: 'Enter advance money',
        required:{
            required: 'Please Enter advance money',
        },
        inputType: 'number'
    },
    {
        field_id: 'price',
        label: 'Price',
        placeholder: 'Enter property price',
        required:{
            required: 'Please Enter property price',
        },
        inputType: 'number'
    },
    {
        options: cities,
        field_id: 'city',
        label: 'City Name',
        inputType: 'autocomplete'
    },
    {
        options: cities,
        field_id: 'areaName',
        label: 'Area Name',
        inputType: 'autocomplete'
    },
    {
        field_id: 'propertyType',
        options: [
            {value: 'flat', label: 'Flat'},
            {value: 'office', label: 'Office'},
            {value: 'showroam', label: 'Showroam'},
        ],
        label: 'Property Type',
        placeholder: 'Enter property type',
        required:{
            required: 'Please Enter property type',
        },
        inputType: 'select'
    },
]