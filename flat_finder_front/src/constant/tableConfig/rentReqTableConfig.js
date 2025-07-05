 const rentReqTableHeader = [
    {
        id: 'property.title',
        header_label: 'Title',
        isImageShow: true,
        secondField: 'property.propertyId'
    },
     {
        id: 'property.city',
        header_label: 'City'
    },
      {
        id: 'property.areaName',
        header_label: 'Area Name'
    },
    {
        id: 'property.price',
        header_label: 'Price'
    },
    {
        id: 'property.advanceMoney',
        header_label: 'AdvanceMoney',
    },
    {
        id: 'property.propertyType',
        header_label: 'PropertyType',
        makeFirstLaterCapital: true
    },
    {
        id: 'status',
        header_label: 'Status',
        
    },
]

export const tableHeaderActionObj =      {
        id: 'Action',
        header_label: 'Action',
        showActionbtn: true,
        cancelBtnShow: true,
        approveBtnShow: false
    }
    
export const buyerRentTableHeader = [
    ...rentReqTableHeader,
    {
        id: 'seller.name',
        header_label: 'Seller',
        isImageShow: true,
        secondField: 'seller.propertyName',
        imageFieldKey: 'seller.image'
    },
    tableHeaderActionObj
]

export const sellerRentTableHeader = [
    ...rentReqTableHeader,
    {
        id: 'message',
        header_label: 'Message'
    },
    {
        id: 'buyer.name',
        header_label: 'Buyer',
        isImageShow: true,
        secondField: 'buyer.phone',
        imageFieldKey: 'seller.image'
    },
    {...tableHeaderActionObj, approveBtnShow: true}
]

