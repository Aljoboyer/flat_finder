 const rentReqTableHeader = [
    {
        id: 'property.title',
        header_label: 'Title',
        isImageShow: true,
        secondField: 'property.propertyId',
        fieldType: 'text'
    },
     {
        id: 'property.city',
        header_label: 'City',
        fieldType: 'text'
    },
      {
        id: 'property.areaName',
        header_label: 'AreaName',
        fieldType: 'text'
    },
    {
        id: 'property.price',
        header_label: 'Price',
        fieldType: 'number',
    },
    {
        id: 'property.advanceMoney',
        header_label: 'AdvanceMoney',
        fieldType: 'number'
    },
    {
        id: 'property.propertyType',
        header_label: 'PropertyType',
        makeFirstLaterCapital: true,
        fieldType: 'text'
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
        imageFieldKey: 'seller.image',
        fieldType: 'text'
    },
    tableHeaderActionObj
]

export const sellerRentTableHeader = [
    ...rentReqTableHeader,
    {
        id: 'message',
        header_label: 'Message',
        fieldType: 'text'
    },
    {
        id: 'buyer.name',
        header_label: 'Buyer',
        isImageShow: true,
        secondField: 'buyer.phone',
        imageFieldKey: 'seller.image',
        fieldType: 'text'
    },
    {...tableHeaderActionObj, approveBtnShow: true}
]

