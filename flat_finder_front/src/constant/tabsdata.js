import BuyerRegistraton from "@/app/(visitor_pages)/(auth_pages)/register/_components/BuyerRegistration";
import SellerRegistraton from "@/app/(visitor_pages)/(auth_pages)/register/_components/SellerRegistraton";
import { BiSolidUserBadge , BiSolidCommentDetail} from "react-icons/bi";
import { FaBuildingUser, FaBuildingShield, FaHouseLock ,
     FaBuildingCircleCheck,FaBuildingCircleXmark , FaLocationDot} from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { FaBuffer } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import Profile from "@/components/common/ProfileAndSettings/Profile";
import Settings from "@/components/common/ProfileAndSettings/Settings";

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


export const PropertyDetailsTabData = [
    {
        label: 'Overview',
        icon: <TbListDetails size={24}/>,
        content: '',
    },
    {
        label: 'Features',
        icon: <FaBuffer  size={24}/>,
        content: '',
    },
    {
        label: 'Locations',
        icon: <FaLocationDot size={24}/>,
        content: '',
    },
    {
        label: 'Comments',
        icon: <BiSolidCommentDetail size={24}/>,
        content: '',
    },
]

export const ProfileSettingsTabData = [
    {
        label: 'Profile',
        icon: <CgProfile size={22}/>,
        content: <Profile/>,
    },
    {
        label: 'Settings',
        icon: <MdOutlineSettings  size={22}/>,
        content: <Settings/>,
    }
]