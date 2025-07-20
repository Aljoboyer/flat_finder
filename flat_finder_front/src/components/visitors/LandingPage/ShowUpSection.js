import { FaSearch, FaLaptop, FaClipboardCheck, FaCouch } from "react-icons/fa";

const ShowUpCard = ({icon, title, subText}) => {
    return (
          <div className="flex items-start gap-4">
              {icon}
              <div>
                <p className="text-white font-bold text-title_sm md:text-title">{title}</p>
                <p className="text-white font-medium text-psm md:text-p">{subText}</p>
              </div>
            </div>
    )
}
export default function ShowUpSection() {
  return (
    <div className="bg-[#1e2d4a] min-h-screen px-4 py-11  text-white flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <p className="text-lg_title md:text-xl_title text-white font-bold">Show up.</p>
          <p className="text-p md:text-p_lg ">Rent an apartment today, and move in tomorrow. We’ll take care of the legwork.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0">
          {/* Left side */}
          <div className="space-y-20 pr-0 md:pr-2">
            <ShowUpCard
                icon={<FaSearch className="text-[40px] mt-1" />}
                title="Search"
                subText="Browse our live website to see all our most up-to-date apartment listings, availability, pricing & photos."
            />
            <ShowUpCard
                icon={<FaClipboardCheck className="text-[40px] mt-1" />}
                title="Check-in"
                subText="Digitally schedule check-in with your instant confirmation email, along with access to our Guest App for all your rental needs."
            />
          </div>

          {/* Center vertical line with steps */}
          <div className="hidden md:flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 top-0 h-full">
            <div className="w-1 h-full bg-sky-300" />
            <div className="absolute top-[4%] w-3 h-3 rounded-full bg-sky-300" />
            <div className="absolute top-[36%] w-3 h-3 rounded-full bg-sky-300" />
            <div className="absolute top-[68%] w-3 h-3 rounded-full bg-sky-300" />
            <div className="absolute bottom-0 w-3 h-3 rounded-full bg-sky-300" />
          </div>

          {/* Right side */}
          <div className="space-y-20 mt-0 md:mt-16 pl-0 md:pl-4">
            <ShowUpCard
                icon={<FaLaptop className="text-[40px] mt-1" />}
                title="Book"
                subText="Found your perfect home? Book online, confirm with a click, securely pay, and sign off on your new home instantly. It’s that easy."
            />

            <ShowUpCard
                icon={<FaCouch className="text-[40px] mt-1" />}
                title="Settle in"
                subText="Move-in ready from Day 1 – Wi-Fi, fully equipped kitchen, linens/towels, toiletries, and even a Welcome Gift on us."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
