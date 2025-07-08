 const rentReqTableHeader = [
    {
        id: 'property.title',
        header_label: 'Title',
        isImageShow: true,
        secondField: 'property.propertyId',
        fieldType: 'text',
        width: '300px'
    },
     {
        id: 'property.city',
        header_label: 'City',
        fieldType: 'text',
        width: '150px'
    },
      {
        id: 'property.areaName',
        header_label: 'AreaName',
        fieldType: 'text',
        width: '200px'
    },
    {
        id: 'property.price',
        header_label: 'Price',
        fieldType: 'number',
        width: '200px'
    },
    {
        id: 'property.advanceMoney',
        header_label: 'AdvanceMoney',
        fieldType: 'number',
        width: '200px'     
    },
    {
        id: 'property.propertyType',
        header_label: 'PropertyType',
        makeFirstLaterCapital: true,
        fieldType: 'text',
        width: '100px'
    },
    {
        id: 'status',
        header_label: 'Status',
        width: '120px'
        
    },
]

export const tableHeaderActionObj =      {
        id: 'Action',
        header_label: 'Action',
        showActionbtn: true,
        cancelBtnShow: true,
        approveBtnShow: false,
        width: '80px'
    }
    
export const buyerRentTableHeader = [
    ...rentReqTableHeader,
    {
        id: 'seller.name',
        header_label: 'Seller',
        isImageShow: true,
        secondField: 'seller.propertyName',
        imageFieldKey: 'seller.image',
        fieldType: 'text',
        width: '200px'
    },

    tableHeaderActionObj
]

export const sellerRentTableHeader = [
    ...rentReqTableHeader,

    {
        id: 'message',
        header_label: 'Message',
        fieldType: 'text',
        width: '200px'
    },
    {
        id: 'createdAt',
        header_label: 'Requested Date',
        fieldType: 'date',
        width: '200px'
    },
    {
        id: 'buyer.name',
        header_label: 'Buyer',
        isImageShow: true,
        secondField: 'buyer.phone',
        imageFieldKey: 'seller.image',
        fieldType: 'text',
        width: '200px'
    },
    {...tableHeaderActionObj, approveBtnShow: true}
]

