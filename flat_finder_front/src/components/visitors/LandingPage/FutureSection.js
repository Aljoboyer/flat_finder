"use client"

const FutureCard = ({imgUrl, title, subText}) => {
  return (
        <div className="text-center">
          <div className="overflow-hidden rounded-tl-[50px] rounded-br-[50px] mb-6">
            <img
              src={imgUrl}
              alt="Move-in ready"
              className="w-full object-cover"
              style={{ objectPosition: "right", aspectRatio: "1.8 / 1" }}
            />
          </div>
          <h2 className="text-title_sm md:text-title font-semibold text-blackshade mb-2">
            {title}
          </h2>
          <p className="text-blackshade text-psm md:text-p">
            {subText}
          </p>
      </div>
  )
}
export default function FutureSection() {
  return (
    <section className="px-4 py-12 md:py-20 bg-white text-center w-full">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-lg_title md:text-xl_title font-semibold text-blackshade mb-6">
          Welcome to the future of living
        </h1>
        <p className="text-blackshade text-p_lg md:text-title_sm">
          Find the peace of mind, flexibility, and confidence to start your latest adventure — a new work gig, a home in between leases, or travel fever — with the ease and comfort of a Blueground home.
        </p>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Hand-picked homes */}
        <FutureCard
        imgUrl="/assets/future1.jpg"
        title="Hand-picked homes"
        subText="Only the best apartments, buildings, and neighborhoods in the world."
        />

        {/* Move-in ready */}
        <FutureCard
        imgUrl="/assets/future2.jpg"
        title="Move-in ready"
        subText="Beautifully furnished and curated spaces that are fully equipped from day one."
        />
      </div>
    </section>
  );
}
