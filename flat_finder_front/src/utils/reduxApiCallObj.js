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

export const mutationCall = (url, method, requestBody) => {
   const apiCallObj = {
          url: `${url}`,
          method: method,
          headers: {
            "Authorization": `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
          body: requestBody
        }
   return apiCallObj;
}