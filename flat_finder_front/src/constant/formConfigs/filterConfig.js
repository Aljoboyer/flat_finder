import { cities } from "../dropdownData";

export  const filterFieldConfig = [
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
      }
    ]