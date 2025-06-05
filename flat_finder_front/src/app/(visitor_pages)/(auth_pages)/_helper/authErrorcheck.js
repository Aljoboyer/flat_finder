

export const authErrorchecker = (response) => {
  const typeObj = {
        type: "server",
        message: response?.error?.data?.message,
        }

    if(response?.error?.data?.emailErr){
      return {
        field: "email",
        typeObj
      }
    }
    else if(response?.error?.data?.phoneErr){
      return {
        field: "phone",
        typeObj
      }
    }
    else if(response?.error?.data?.propertyErr){
      return {
        field: "propertyName",
        typeObj
      }
    }
    else if(response?.error?.data?.message == "User doesn't exist with this email"){
        return {
        field: "email",
        typeObj
      }
    }
     else if(response?.error?.data?.message == "Incorrect password"){
        return {
        field: "password",
        typeObj
      }
    }
}