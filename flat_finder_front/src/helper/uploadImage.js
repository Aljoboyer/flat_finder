import { BASEURL, UPLOAD_IMAGE } from '@/constant/urls';
import axios from 'axios';

export const uploadImage = async (image, setLoading) => {
  setLoading(true);
  console.log('Picture:', image);
  // console.log("Set Icon Url", setIconUrl);
  var formData = new FormData();

  formData.append('media', image); 
  let response = await axios.post(`${BASEURL}${UPLOAD_IMAGE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  setLoading(false);

  return response?.data;
};