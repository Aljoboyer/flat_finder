import React from 'react'

export default function FutureSection() {
  return (
    <section className="px-4 py-12 md:py-20 bg-white text-center w-full">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-6">
          Welcome to the future of living
        </h1>
        <p className="text-gray-700 text-base md:text-lg">
          Find the peace of mind, flexibility, and confidence to start your latest adventure — a new work gig, a home in between leases, or travel fever — with the ease and comfort of a Blueground home.
        </p>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Hand-picked homes */}
        <div className="text-center">
          <div className="overflow-hidden rounded-[40px] mb-6">
            <img
              src="/assets/future1.jpg"
              alt="Hand-picked homes"
              className="w-full object-cover"
              style={{ objectPosition: "left", aspectRatio: "1.8 / 1" }}
              
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Hand-picked homes
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            Only the best apartments, buildings, and neighborhoods in the world.
          </p>
        </div>

        {/* Move-in ready */}
        <div className="text-center">
          <div className="overflow-hidden rounded-[40px] mb-6">
            <img
              src="/assets/future2.jpg"
              alt="Move-in ready"
              className="w-full object-cover"
              style={{ objectPosition: "right", aspectRatio: "1.8 / 1" }}
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Move-in ready
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            Beautifully furnished and curated spaces that are fully equipped from day one.
          </p>
        </div>
      </div>
    </section>
  );
}
