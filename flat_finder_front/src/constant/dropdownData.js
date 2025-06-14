
export const languages = [
    {'label': 'English', "value": "English"},
    {'label': 'French', "value": "French"},
    {'label': 'Bangla', "value": "Bangla"}
]

//numbers
export const itemNumbers =  Array.from({ length: 20 }, (_, i) => {
  const value = (i + 1).toString();
  return { label: value, value: value };
});