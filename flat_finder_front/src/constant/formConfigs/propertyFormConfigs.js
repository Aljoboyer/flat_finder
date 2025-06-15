import { numberRegex } from "./regexData";
import { cities, itemNumbers } from "../dropdownData";

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
            pattern: {
                    value: numberRegex,
                    message: "Please enter valid amount",
                }
        },
        inputType: 'number'
    },
    {
        field_id: 'price',
        label: 'Price',
        placeholder: 'Enter property price',
        required:{
            required: 'Please Enter property price',
            pattern: {
            value: numberRegex,
            message: "Please enter valid amount",
            }
        },
        inputType: 'number'
    },
    {
        options: cities,
        field_id: 'city',
        label: 'City Name',
        inputType: 'autocomplete',
        required:{
            required: 'Please Enter city name',
        },
    },
    {
        options: [],
        field_id: 'areaName',
        label: 'Area Name',
        inputType: 'autocomplete',
        required:{
            required: 'Please Enter area name',
        },
        suggestionText: "Please Select City First"
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
        inputType: 'select',
         value: ""
    },
    {
        field_id: 'flatMeasurement',
        label: 'Flat Measurement',
        placeholder: 'Enter Measurement',
        required:{
            required: 'Please Enter Measurementy',
            pattern: {
                    value: numberRegex,
                    message: "Please enter valid Measurement",
                }
        },
        inputType: 'number'
    },
    {
        field_id: 'bedRooms',
        options: itemNumbers.slice(0, 10),
        label: 'Bed Rooms',
        placeholder: 'Enter total bedroom',
        required:{
            required: 'Please Enter total bedroom',
        },
        inputType: 'select',
         value: ""
    },
    {
        field_id: 'bathrooms',
        options: itemNumbers.slice(0, 5),
        label: 'Bath Rooms',
        placeholder: 'Enter total bath room',
        required:{
            required: 'Please Enter total bath room',
        },
        inputType: 'select',
         value: ""
    },
    {
        field_id: 'balcony',
        options: itemNumbers.slice(0, 5),
        label: 'Balcony',
        placeholder: 'Enter total balcony',
        required:{
            required: 'Please Enter total balcony',
        },
        inputType: 'select',
        value: ""
    },
    {
        field_id: 'floorNo',
        options: itemNumbers,
        label: 'Floor No.',
        placeholder: 'Enter total floor no',
        required:{
            required: 'Please Enter floor no',
        },
        inputType: 'select',
        value: ""
    },
    {
        field_id: 'purpose',
        options: [
            {value: 'rent', label: 'Rent'},
            {value: 'sell', label: 'Sell'},
        ],
        label: 'Purpose',
        placeholder: 'Enter property purpose',
        required:{
            required: 'Please Enter property purpose',
        },
        inputType: 'select',
        value: ""
    },
    {
        field_id: 'generator',
        label: 'Generator',
        inputType: 'checkbox',
        value: false
    },
    {
        field_id: 'govtGas',
        label: 'Govt. Gas',
        inputType: 'checkbox',
        value: false
    },
    {
        field_id: 'cctvSecurity',
        label: 'CC-Tv Security',
        inputType: 'checkbox',
        value: false
    },
     {
        field_id: 'schoolNearBy',
        label: 'School NearBy',
        inputType: 'checkbox',
        value: false
    },
    {
        field_id: 'parking',
        label: 'Parking',
        inputType: 'checkbox',
        value: false
    },
    {
        field_id: 'hospitalNearBy',
        label: 'Hospital NearBy',
        inputType: 'checkbox',
        value: false
    },
    {
        field_id: 'description',
        label: 'Property Description',
        inputType: 'textarea',
        placeholder: 'Write Property Description...',
        required:{
            required: 'Please Enter property Description',
        },
    },

]