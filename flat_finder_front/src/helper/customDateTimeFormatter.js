import moment from "moment";


export const formatCustomDateTime = (datetimeString) => {
  const inputDate = moment(datetimeString);
  const now = moment();

  if (inputDate.isSame(now, 'day')) {
    return inputDate.format('hh:mm A'); // e.g., 03:52 PM
  } else if (inputDate.isSame(now.clone().subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  } else {
    return inputDate.format('MM/DD/YYYY'); // e.g., 08/03/2025
  }
}

