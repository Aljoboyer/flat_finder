import React from 'react'
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from '@/theme/colors';

export default function PropertyFormImg() {
  return (
    <div className="sm:overflow-visible overflow-x-auto">
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4 min-w-[520px] sm:min-w-0">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div
            key={item}
            className="relative bg-white shadow-md rounded overflow-hidden min-w-[120px]"
          >
            <IconButton
                size="small"
                // onClick={onDelete}
                className="!absolute !top-1 !right-1 !shadow-sm hover:!text-red-500"
                sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: COLORS.overlay,
                    color: 'inherit',
                    '&:hover': {
                    backgroundColor: 'red', 
                    color: 'white',
                    },
                }}
                >
                <CloseIcon fontSize="small" />
                </IconButton>


            {/* Image */}
            <img
              src="/assets/website_logo.png"
              alt="Sample"
              className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
