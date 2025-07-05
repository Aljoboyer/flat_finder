import { Buttons } from '@/components/common/Buttons/Buttons';
import { COLORS } from '@/theme/colors';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { capitalizeFirstLetter } from '@/utils/stringHelper';
import { Beenhere, LocationCity, LocationOn } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsChat } from 'react-icons/bs';
import { TbPhone } from 'react-icons/tb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SellerInfoSection = ({propertyDetails, requestHandler, specificRentRequest})=> {
  const router = useRouter();
 
  const userdata = getLocalStorageData();

  const sendRequest = () => {

     if(userdata?._id){
      requestHandler()
     }
     else{
      router.push('/login')
     }
  }

  return (
    <div
      className="pl-0 lg:pl-4 sm:0 w-full lg:w-2/5 mt-4 lg:mt-0"

    >
      <div className="w-full p-2 md:p-0 lg:p-0">
        <div className="w-fit">
          <div className='w-[100px] bg-blue-800 flex flex-row justify-center items-center rounded h-[30px]'>
            <p className='text-p text-white font-medium'>For {capitalizeFirstLetter(propertyDetails?.purpose)}</p>
          </div>
          <p className="text-blackshade text-lg_title font-medium">
             {propertyDetails?.title}
          </p>{' '}
        </div>

        <div className="w-fit my-4">
          <p className="text-blackshade text-xl_title font-bold">
              {propertyDetails?.price} BDT
          </p>

           <p className="text-blue-800 text-p font-bold">
              Advance pay:{' '} {propertyDetails?.advanceMoney} BDT
            </p>
        </div>
           {
            specificRentRequest?.buyer?._id == userdata?._id ? <div className='flex flex-row items-center justify-center bg-successOverlay rounded-md py-2 text-blakshade'>
                  <CheckCircleOutlineIcon color="white" />
                  <p className='font-semibold text-p ms-2'>You’ve already requested this flat</p>
            </div> : <Buttons
              onClickHandler={() => sendRequest()}
              title={`Send Request ${propertyDetails?.purpose == 'sell' ? 'To Buy' : 'For Rent'}`}
              bgColor={COLORS.overlay}
              textColor={COLORS.baseColor}
              other_style={{
                marginTop: '12px',
                fontWeight: '600',
                fontSize: '16px',
                width: '100%',
                padding: '10px 0',
                borderRadius: '4px',
                border: `1px solid ${COLORS.baseColor}`,
              }}
            />
           }
        <div
          onClick={() => {}}
          className="bg-basecolor w-full h-[40px] flex flex-row justify-center items-center rounded-sm cursor-pointer mt-4"
        >
           <BsChat color={COLORS.side_yellow} size={24} /> 
          <p className="text-side_yellow text-p font-bold ml-2">
           Message merchant
          </p>
        </div>
      </div>

      <div className="w-full bg-overlay p-2 md:p-4 lg:p-4 mt-4 h-[370px]">
        <div className="w-full grid grid-cols-3 items-start">
          <p className="font-bold text-base">Seller</p>
          <div className="text-sm  col-span-2">
            <p
              className="text-basecolor text-p font-bold"
            >
              {propertyDetails?.seller?.name}
            </p>
            <div className="w-full flex flex-row justify-start items-center mt-4">
           
              <div className='w-[70px] h-[70px]'>
                <img
                  className="search_img"
                  src={propertyDetails?.seller?.image ? propertyDetails?.seller?.image  : '/assets/placeholderimg.jpg'}
                />
              </div>
              <div className="ms-4">
                <div className="w-full flex flex-row justify-start items-center cursor-pointer">
                  <TbPhone color={COLORS.baseColor} size={24} />
                  <p className="text-basecolor text-p ">
                    {propertyDetails?.seller?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

            <div className="w-full">
              <div className="w-full flex flex-row justify-start items-center mt-4">
                <p className="font-bold text-p">Property Name</p>
                <p className="text-p  ms-3 md:ms-11 lg:ms-11 ">
                   <LocationCity color={COLORS.baseColor}/>  {propertyDetails?.seller?.propertyName}
                </p>
              </div>

              <div className="w-full flex flex-row justify-start items-center mt-4">
                <p className="font-bold text-p">Seller Address</p>
                <p className="text-p  ms-5 md:ms-13 lg:ms-13">
                  <LocationOn color={COLORS.baseColor}/> {propertyDetails?.seller?.address?.city} , {propertyDetails?.seller?.address?.country}
                </p>
              </div>
              <Buttons 
              other_style={{fontSize: '16px', fontWeight: '600', marginTop: '80px'}}
              icon={<Beenhere style={{marginRight: '5px'}}/>}
              title='Follow Seller for Updates' 
              bgColor={COLORS.side_yellow} 
              textColor={COLORS.baseColor} />
          </div>
      </div>
    </div>
  );
};

export default SellerInfoSection
