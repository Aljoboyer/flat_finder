import { Avatar } from "@mui/material";
import { LocationOn, Bed } from "@mui/icons-material";
import { FaBath } from "react-icons/fa6";
import { PiResizeFill } from "react-icons/pi";
import { Buttons } from "../Buttons/Buttons";
import { COLORS } from "@/theme/colors";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/stringHelper";


export default function PropertyCard({property}) {
  const router = useRouter();

  return (

      <div onClick={() => router.push(`/property-details/${property?._id}`)} className="md:flex property_card jusity-between rounded  h-fit md:h-[350px]  w-full mt-7 cursor-pointer">
        {/* Images */}
        <div className="w-full md:w-1/2 flex flex-row">
          <div className="h-full w-full">
            <img
            src={property?.images[0] ? property?.images[0] : '/assets/placeholderimg.jpg'}
            alt="Property"
            className="object-contain md:object-cover h-full w-full"
          />
          </div>
          {/* Optional: more images for larger screens */}
            <div className="w-[150px] h-full hidden md:block px-2">
                <div className='h-[85px]'>
                      <img src={property?.images[1] ? property?.images[1] : '/assets/placeholderimg.jpg'} alt="" className="card_img cursor-pointer"/>
                </div>
                <div className='h-[85px]'>
                      <img src={property?.images[2] ? property?.images[2] : '/assets/placeholderimg.jpg'} alt="" className="card_img cursor-pointer"/>
                </div>
                <div className='h-[85px]'>
                      <img src={property?.images[3] ? property?.images[3] : '/assets/placeholderimg.jpg'} alt="" className="card_img cursor-pointer"/>
                </div>
                <div className='h-[85px]'>
                      <img src={property?.images[4] ? property?.images[4] : '/assets/placeholderimg.jpg'} alt="" className="card_img cursor-pointer"/>
                </div>
            </div>
        </div>
       

        {/* Details */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-basecolor text-title_sm md:text-title font-bold">{property?.title}</h2>
            <div className="text-grey600 flex items-center mt-2">
              <LocationOn fontSize="medium" />
              <span className="text-p">{property?.city}, {property?.areaName}</span>
            </div>

            <div className="flex items-center gap-4 text-title_sm mt-4 text-gray700">
              <span className="flex items-center gap-1"><Bed  />{property?.bedRooms}</span>
              <span className="flex items-center gap-1"><FaBath  />{property?.bathrooms}</span>
              <span className="flex items-center gap-1"><PiResizeFill  />{property?.flatMeasurement} sq.ft</span>
            </div>

             
            <div className="flex items-center my-4">
              <Avatar src={property?.seller?.propertyName} alt={property?.seller?.name} className="mr-3" />
              <div>
                <p className="font-medium">{property?.seller?.name}</p>
                <p className="text-sm text-gray-500">{property?.seller?.propertyName}</p>
              </div>
            </div>

             <h2 className=" text-lg_title font-bold">{property?.price} BDT</h2>
          </div>
<div className='w-[100px] bg-blue-800 flex flex-row justify-center items-center rounded h-[30px]'>
            <p className='text-p text-white font-medium'>For {capitalizeFirstLetter(property?.purpose)}</p>
          </div>
          {/* Call to action button */}
          <div className="mt-4 md:mt-0 text-right">
            <Buttons title="VIEW DETAILS" bgColor={COLORS.side_yellow} textColor={COLORS.baseColor} other_style={{width: {xs: '100%', md: '50%', lg: '30%'}, fontWeight: "bold", fontSize: '16px'}}/>
          </div>
        </div>
      </div>

  );
}
