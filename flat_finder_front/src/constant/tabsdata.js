import BuyerRegistraton from "@/app/(visitor_pages)/(auth_pages)/register/_components/BuyerRegistration";
import SellerRegistraton from "@/app/(visitor_pages)/(auth_pages)/register/_components/SellerRegistraton";
import { BiSolidUserBadge } from "react-icons/bi";
import { FaBuildingUser, FaBuildingShield, FaHouseLock ,
     FaBuildingCircleCheck,FaBuildingCircleXmark } from "react-icons/fa6";

export const RegisterTabData = [
    {
        label: 'Buyer',
        icon: <BiSolidUserBadge size={20}/>,
        content: <BuyerRegistraton/>,
    },
    {
        label: 'Seller',
        icon: <FaBuildingUser size={20}/>,
        content: <SellerRegistraton/>,
    },
]

export const PropertiesTabData = [
    {
        label: 'Available',
        icon: <FaBuildingCircleCheck size={22}/>,
        content: '',
    },
    {
        label: 'InActive',
        icon: <FaBuildingCircleXmark  size={22}/>,
        content: '',
    },
    {
        label: 'Processing',
        icon: <FaBuildingShield size={22}/>,
        content: '',
    },
    {
        label: 'Rented/Sold',
        icon: <FaHouseLock size={22}/>,
        content: '',
    },
]