 export const savedListTableConfig = [
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
        id: 'property.flatMeasurement',
        header_label: 'Size',
        fieldType: 'size',
        width: '120px'     
    },
    {
        id: 'property.propertyType',
        header_label: 'PropertyType',
        makeFirstLaterCapital: true,
        fieldType: 'text',
        width: '100px'
    },
    {
        id: 'seller.name',
        header_label: 'Seller',
        isImageShow: true,
        secondField: 'seller.propertyName',
        imageFieldKey: 'seller.image',
        fieldType: 'text',
        width: '200px'
    },
    {
        id: 'Action',
        header_label: 'Action',
        showActionbtn: true,
        editBtnShow: false,
        statusBtn: false,
        viewBtnShow:true,
        unSaveBtnShow: true,
        width: '80px',
    }
]
