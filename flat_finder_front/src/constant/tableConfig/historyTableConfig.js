
export const historyTableHeader = [
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
        header_label: 'Area Name',
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
        id: 'property.propertyType',
        header_label: 'Property Type',
        makeFirstLaterCapital: true,
        fieldType: 'text',
        width: '100px'
    },
    {
        id: 'amount',
        header_label: 'Advance Paid',
        fieldType: 'number',
        width: '200px'
    },

    {
        id: 'createdAt',
        header_label: 'Payment Date',
        fieldType: 'date',
        width: '200px'
    },
]

export const buyerHistoryTableHeader = [
    ...historyTableHeader,
        {
        id: 'seller.name',
        header_label: 'Seller',
        isImageShow: true,
        secondField: 'seller.propertyName',
        imageFieldKey: 'seller.image',
        fieldType: 'text',
        width: '200px'
    },
]

export const sellerHistoryTableHeader = [
    ...historyTableHeader,
    {
        id: 'paymentIntentId',
        header_label: 'Transaction ID',
        fieldType: 'text',
        width: '200px'
    },
    {
        id: 'buyer.name',
        header_label: 'Buyer',
        isImageShow: true,
        secondField: 'buyer.phone',
        imageFieldKey: 'buyer.image',
        fieldType: 'text',
        width: '200px'
    },
]