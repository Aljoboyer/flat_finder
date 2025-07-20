"use client";
import { Buttons } from "@/components/common/Buttons/Buttons";
import FFModal from "@/components/common/Modals/FFModal";
import { COLORS } from "@/theme/colors";
import { getLocalStorageData } from "@/utils/getLocalStorageData";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const cardData = [
  {
    title: "Rent a Property",
    description:
      "Discover your ideal living space - explore a variety of rental properties and find the perfect home for your next chapter!",
    icon: "/assets/buy-property.svg",
  },
  {
    title: "Buy a Property",
    description:
      "Seize the opportunity to own your dream property - invest in your future today!",
    icon: "/assets/rent-property.svg",
  },
  {
    title: "Sell a Property",
    description:
      "Explore exclusive properties for sale and seize the opportunity to own your dream home.",
    icon: "/assets/sell-property.svg",
  },
];

export default function PropertyCards() {
  const userData = getLocalStorageData();
  const [open, setOpen] = useState(false)
  const router = useRouter();

  const toggoleModal = () => {
    setOpen(!open)
  }
  return (
    <section className="px-4 py-16 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center flex flex-col items-center"
          >
            <div className="mb-6">
              <img src={item.icon} alt={item.title} width={100} height={100} />
            </div>
            <h3 className="text-title md:lg_title font-bold text-basecolor mb-3">
              {item.title}
            </h3>
            <div className="h-[100px]">
              <p className="text-gray-600 text-psm md:text-p mb-6">{item.description}</p>
            </div>
            <Buttons
              onClickHandler={() => {
                if(userData?._id){
                  if(item?.title == 'Rent a Property' || item?.title == "Buy a Property"){
                  router.push('/search-property')
                  }else{
                    if(userData?.role == 'buyer'){
                      toggoleModal()
                    }else{
                      router.push('/create-property')
                    }
                  }
                }
                else{
                    router.push('/login')
                }
              }}
              textColor={COLORS.baseColor}
              bgColor='white'
              title='See Details'
              other_style={{border: "solid 1px #017163", 
                  ":hover": {backgroundColor: COLORS.baseColor, color: COLORS.side_yellow},
                  transition: "all 0.4s ease-in-out", width: '200px', fontWeight: '600'}}
              />
          </div>
        ))}
      </div>
      <FFModal
      show="message"
      modalTitle="Selling a Property? Let’s Get Started"
      note="You’ll need a seller account to post your property. It only takes a minute to register and start listing!"
      title1="Create"
      confirmHandler={() => router.push('/register')}
      open={open}
      setOpen={setOpen}
      />
    </section>
  );
}
