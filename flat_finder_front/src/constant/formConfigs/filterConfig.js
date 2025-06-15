import { cities } from "../dropdownData";

export  const filterFieldConfig = [
      {
        options: cities,
        label: 'City Name',
        inputType: 'autocomplete'
      },
      {
        options: cities,
        label: 'Area Name',
        inputType: 'autocomplete'
      }
    ]