import { Skeleton, Avatar, Box, Stack } from "@mui/material";

export default function SkeletonPropertyCard() {
  return (
    <div className="md:flex property_card justify-between rounded h-fit md:h-[430px] w-full mt-7">
      
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex flex-row">
        {/* Main image */}
        <div className="h-full w-full">
          <Skeleton variant="rectangular" width="100%" height="100%" className="!min-h-[300px] md:!h-full" />
        </div>

        {/* Thumbnails (only visible on md and up) */}
        <div className="w-[150px] h-full hidden md:flex flex-col gap-2 px-2">
          {[1, 2, 3, 4].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width="100%" height={60} />
          ))}
        </div>
      </div>

      {/* Detail Section */}
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Skeleton variant="text" width="70%" height={30} />
          
          {/* Location */}
          <Stack direction="row" spacing={1} alignItems="center" className="mt-2">
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="60%" />
          </Stack>

          {/* Icons with text (beds, baths, size) */}
          <Stack direction="row" spacing={4} className="mt-4">
            {[1, 2, 3].map((_, i) => (
              <Stack key={i} direction="row" spacing={1} alignItems="center">
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="text" width={30} />
              </Stack>
            ))}
          </Stack>

          {/* Avatar and Name */}
          <Stack direction="row" spacing={2} alignItems="center" className="my-4">
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="text" width={100} height={16} />
            </Box>
          </Stack>

          {/* Price */}
          <Skeleton variant="text" width="40%" height={30} />
        </div>

        {/* CTA Button */}
        <div className="mt-4 md:mt-0 text-right">
          <Skeleton variant="rectangular" width="30%" height={45} className="ml-auto" />
        </div>
      </div>
    </div>
  );
}
