import { getAuthToken } from "./getAuthToken";


export const getListQueryCall = (url,querys) => {
   const apiCallObj = {
          url: `${url}?${querys}`,
          method: "GET",
          headers: {
            "Authorization": `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
   return apiCallObj;
}