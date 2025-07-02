import { FaBath , FaBed , FaGasPump, FaCarSide , FaHospital} from "react-icons/fa";
import { MdBalcony } from "react-icons/md";
import { TbMathXFloorDivideY } from "react-icons/tb";
import { GiPowerGenerator } from "react-icons/gi";
import { GiCctvCamera } from "react-icons/gi";
import { FaGoogleScholar } from "react-icons/fa6";

export const propertyFeaturesList = [
    {
        label: 'Bedrooms',
        icon:  <FaBed size={34}/>
    },
    {
        label: 'Bathrooms',
        icon:  <FaBath size={34}/>
    },
    {
        label: 'Balcony',
        icon:  <MdBalcony size={34}/>
    },
    {
        label: 'Floor area (sqft)',
        icon:  <MdBalcony size={34}/>
    },
    {
        label: 'Floor No',
        icon:  <TbMathXFloorDivideY size={34}/>
    },
    {
        label: 'Generator',
        icon:  <GiPowerGenerator size={34}/>
    },
    {
        label: 'Govt. Gas',
        icon:  <FaGasPump size={34}/>
    },
    {
        label: 'CCTV Security',
        icon:  <GiCctvCamera size={34}/>
    },
    {
        label: 'Nearby Schools',
        icon:  <FaGoogleScholar size={34}/>
    },
    {
        label: 'Parking',
        icon:  <FaCarSide  size={34}/>
    },
    {
        label: 'Nearby Hospitals',
        icon:  <FaHospital  size={34}/>
    },
]

export const labelMap = {
  'Floor No': 'floorNo',
  'Bedrooms': 'bedRooms',
  'Bathrooms': 'bathrooms',
  'Balcony': 'balcony',
  'Floor area (sqft)': 'flatMeasurement',
  'Generator': 'generator',
  'Govt. Gas': 'govtGas',
  'CCTV Security': 'cctvSecurity',
  'Nearby Schools': 'schoolNearBy',
  'Nearby Hospitals': 'hospitalNearBy',
  'Parking': 'parking'
};
