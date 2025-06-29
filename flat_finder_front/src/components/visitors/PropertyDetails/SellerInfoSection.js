import React from 'react';
import { BsChat } from 'react-icons/bs';
import { TbPhone } from 'react-icons/tb';

const SellerInfoSection = ()=> {
 
  return (
    <div
      className="pl-0 lg:pl-4 sm:0 w-full lg:w-2/5 mt-4 lg:mt-0"

    >
      <div className="w-full p-2 md:p-0 lg:p-0">
        <div className="w-fit">
          <p className="text-[#313C53] text-[32px]">
            { 'Porsche Panamera'}
          </p>{' '}

        <p className="text-[#313C53] text-[16px]">
              AFDFD8798 |{' '}
              {'24/24'}{' '}
            </p>
        </div>

        <div className="w-fit my-4">
          <p className="text-[#313C53] text-[32px] font-bold">
            {'58340958$'}
          </p>

           <p className="text-[#313C53] text-[12px]">
              Depreciation:{' '} 3243/ yr
              
            </p>
        </div>

        <div
          onClick={() => {}}
          className="bg-[#0534FF] w-full h-[40px] flex flex-row justify-center items-center rounded-sm cursor-pointer "
        >
          <p className="text-white text-[16px] font-bold mr-2">
            Message merchant
          </p>
        </div>
      </div>

      <div className="w-full bg-[#F7F7F5] p-2 md:p-4 lg:p-4 mt-4 h-[370px]">
        <div className="w-full grid grid-cols-3 items-start">
          <p className="font-bold text-base">Merchant</p>
          <div className="text-sm  col-span-2">
            <p
              onClick={() => {}}
              className="text-[#0534FF] text-[16px] font-bold cursor-pointer"
            >
              { 'Porsche Singapore'}
            </p>
            <div className="w-full flex flex-row justify-start items-center mt-4">
           
              <div className='w-[70px] h-[70px]'>
                <img
                  className="search_img"
                  src={''}
                />
              </div>
              <div className="ms-4">
                <div className="w-full flex flex-row justify-start items-center">
                  <TbPhone color="#0534FF" size={24} />
                  <p className="text-[#0534FF] text-[16px] ms-2">
                    {'6816 9911'}
                  </p>
                </div>
                <div className="w-full flex flex-row justify-start items-center mt-2">
                  <BsChat color="#0534FF" size={24} />
                  <p className="text-[#0534FF] text-[16px] ms-2">Chat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

            <div className="w-full">
            <div className="w-full flex flex-row justify-start items-center mt-4">
              <p className="font-bold text-[16px]">PARF Rebate</p>
              <p className="text-[16px]  ms-5 md:ms-17 lg:ms-17">
                {'987543kkkk'}
              </p>
            </div>

            <div className="w-full flex flex-row justify-start items-center mt-4">
              <p className="font-bold text-[16px]">Dereg Value</p>
              <p className="text-[16px]  ms-7 md:ms-18 lg:ms-18 ">
                {'4334 as of today'}
              </p>
            </div>

            <div className="w-full flex flex-row justify-start items-center mt-4">
              <p className="font-bold text-[16px]">Fuel type</p>
              <p className="text-[16px]  ms-13 md:ms-24 lg:ms-24 ">
                {'uysdfsdfs'}
              </p>
            </div>

            <div className="w-full flex flex-row justify-start items-center  mt-4">
              <p className="font-bold text-[16px]">Promotion</p>
              <p className="text-[16px]  ms-[42px] md:ms-24 lg:ms-21 ">
                { 'No current promotions. Message seller to check if there is any new promotions.'}
              </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SellerInfoSection
