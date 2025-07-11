
export const isPropertySaved = (saveData, propertyId) => {
   
    if(saveData?.length > 0 && propertyId){
      
        const isPropertyExists = saveData?.find((item) => item?.property?._id === propertyId);
        if(isPropertyExists && isPropertyExists?._id){
            return true
        }
        else{
            return false
        }
    }
}