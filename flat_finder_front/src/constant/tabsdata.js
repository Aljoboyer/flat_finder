import BuyerRegistraton from "@/app/(visitor_pages)/(auth_pages)/register/_components/BuyerRegistration";
import SellerRegistraton from "@/app/(visitor_pages)/(auth_pages)/register/_components/SellerRegistraton";
import { BiSolidUserBadge } from "react-icons/bi";
import { FaBuildingUser } from "react-icons/fa6";

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