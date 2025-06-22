import { cities, propertyTypes } from "../dropdownData";

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
      }
    ]