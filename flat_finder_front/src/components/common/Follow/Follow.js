import { getLocalStorageData } from '@/utils/getLocalStorageData'
import React from 'react'
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { Delete } from "@mui/icons-material";

const followers = [
  {
    id: 1,
    name: "Tanvir Ahmed",
    phone: "+8801845702501",
    avatar:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ayesha Siddiqua",
    phone: "+8801712345678",
    avatar:
      "https://randomuser.me/api/portraits/women/65.jpg",
  },
  
  // Add more dummy followers...
];

export default function Follow() {
  const handleRemove = (id) => {
    console.log("Remove follower with ID:", id);
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Followers</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {followers.map((follower) => (
          <Card
            key={follower.id}
            className="w-full shadow-md rounded-2xl"
            sx={{
              borderRadius: "1rem",
            //   transition: "all 0.3s",
            //   ":hover": {
            //     boxShadow: 6,
            //   },
            }}
          >
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar
                  src={follower.avatar}
                  alt={follower.name}
                  sx={{ width: 56, height: 56 }}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {follower.name}
                  </h3>
                  <p className="text-sm text-gray-600">{follower.phone}</p>
                </div>
              </div>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => handleRemove(follower.id)}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "scale(1.0)",
                  },
                }}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
