
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

//Cities
export const cities = [
  { label: "Dhaka", value: "Dhaka" },
  { label: "Chattogram", value: "Chattogram" },
  { label: "Khulna", value: "Khulna" },
  { label: "Rajshahi", value: "Rajshahi" },
  { label: "Barishal", value: "Barishal" },
  { label: "Sylhet", value: "Sylhet" },
  { label: "Rangpur", value: "Rangpur" },
  { label: "Cumilla", value: "Cumilla" }
];
