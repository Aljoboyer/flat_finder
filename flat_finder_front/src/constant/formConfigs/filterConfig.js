import { cities, itemNumbers, propertyTypes } from "../dropdownData";

export  const filterFieldConfig = [
      {
          field_id: 'propertyType',
          options: propertyTypes,
          label: 'Property Type',
          placeholder: 'Enter property type',
          inputType: 'select',
          fieldValue: {
           value: ""
          },
      },
      {
        options: cities,
        label: 'City Name',
        inputType: 'autocomplete',
        fieldValue: {
           value: ""
        },
        field_id: 'city',
      },
      {
        options: [],
        label: 'Area Name',
        inputType: 'autocomplete',
        fieldValue: {
           value: ""
        },
        field_id: 'areaName',
        suggestionText: "Please Select City First"
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
        fieldValue: {
           value: ""
        },
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
         fieldValue: {
           value: ""
        },
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
              fieldValue: {
           value: ""
        },
        },
    ]