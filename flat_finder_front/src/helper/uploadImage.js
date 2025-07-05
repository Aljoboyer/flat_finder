import { BASEURL, UPLOAD_IMAGE } from '@/constant/urls';
import axios from 'axios';

export const uploadImage = async (image, setLoading) => {
  setLoading(true);

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