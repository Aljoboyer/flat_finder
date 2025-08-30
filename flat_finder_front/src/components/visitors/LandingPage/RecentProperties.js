import { useLazyBuyerSavedPropertyListQuery } from '@/app/redux/features/profileApi';
import { useLazyGetPropertyListQuery } from '@/app/redux/features/propertyApi';
import { Buttons } from '@/components/common/Buttons/Buttons'
import FFNodata from '@/components/common/FFNodata';
import ApartmentCardSkeleton from '@/components/common/Loaders/PropertyCardSmallSkeleton';
import ApartmentCard from '@/components/common/PropertyCard/PropertyCardSmall';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle'
import { COLORS } from '@/theme/colors'
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Slider from "react-slick";

function ArrowButton(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", backgroundColor: COLORS.baseColor , height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center',}}
      onClick={onClick}
    />
  );
}

export default function RecentProperties() {
    const router = useRouter();
    const userdata = getLocalStorageData();
    const [propertyListTrigger, { data: propertyList, isFetching}] = useLazyGetPropertyListQuery();
    const [propertySavedList, { data: savedList, }] = useLazyBuyerSavedPropertyListQuery();

    useEffect(() => {
        propertyListTrigger({ querys: `limit=${6}&page=${1}&status=active` });
        propertySavedList({ querys: `limit=${100}&page=${1}&buyer=${userdata?._id}` });
    },[])

    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <ArrowButton />,
    prevArrow: <ArrowButton />
  };

  return (
    <div className='p-4 md:-px-11 lg:px-13 w-full  my-11'>
        <SectionTitle title="Recently Posted" />

        <div className="  pt-7 ">
            {
                isFetching ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12'>
                    {
                        [1,2,3, 4]?.map((item) => (
                <ApartmentCardSkeleton key={item}/>
                )) 
                    }
                </div>: <>
                    {
                    propertyList?.data?.length == 0 || !propertyList?.data ? <FFNodata/> : 
                        <>
                            <div className='hidden lg:block bg-overlay py-4'>
                                <Slider  {...settings}>
                                {
                                    propertyList?.data?.map((item) => (
                                        <ApartmentCard sliderWidth={true} key={item?._id} 
                                        property={item}
                                        savedList={savedList?.data}
                                        />
                                        ))
                                    }
                                </Slider>
                            </div>
                            <div className='lg:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12'>
                                {
                                    propertyList?.data?.map((item) => (
                                        <ApartmentCard sliderWidth={true} key={item?._id} 
                                        property={item}
                                        savedList={savedList?.data}
                                        />
                                        ))
                                    }
                            </div>
                        </>
                    }
                </>
            }
        </div>

        <div className='flex flex-row justify-center py-7 '>
            <Buttons
            onClickHandler={() => router.push('/search-property')}
            textColor={COLORS.baseColor}
            bgColor='white'
            title='See all Properties'
            other_style={{border: "solid 1px #017163", 
                ":hover": {backgroundColor: COLORS.baseColor, color: COLORS.side_yellow},
                transition: "all 0.4s ease-in-out", width: '300px', fontWeight: '600'}}
            />
        </div>
    </div>
  )
}
