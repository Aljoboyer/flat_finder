import { profileFormConfigs, settingsFormConfigs } from '@/constant/formConfigs/profileFormConfigs'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import InputField from '../Inputs/InputField';
import { CardContent } from '@mui/material';
import { Buttons } from '../Buttons/Buttons';
import { COLORS } from '@/theme/colors';

export default function Settings() {
    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
      } = useForm();
    
      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedImage(URL.createObjectURL(file));
        }
      };
    const onSubmit = ()  => {
    
    }

  return (
   <div className="w-full md:w-2/3 property_card bg-white">
          <CardContent className="space-y-4">
            <h2 className="font-semibold text-title text-blackshade my-4">Update Account Settings</h2>
              <form className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-4 gap-y-6" 
              onSubmit={handleSubmit(onSubmit)} noValidate>
                {
                  settingsFormConfigs?.map((fieldItem) => (
                    <Controller
                        key={fieldItem?.field_id}
                        name={fieldItem?.field_id}
                        control={control}
                        defaultValue=""
                        rules={{
                          ...fieldItem?.required
                        }}
                        render={({ field }) => (
                            <InputField
                            otherStyle={{marginTop: '14px'}}
                            label={fieldItem?.label} 
                            field={field}
                            field_id={fieldItem?.field_id}
                            errors={errors}
                            placeholder={fieldItem?.placeholder}
                            inputType={fieldItem?.inputType}
                          
                            />
                        )}
                      />
                  ))
                }
            </form>

               <Buttons
                title="Change Password"
                bgColor={COLORS.baseColor}
                textColor={COLORS.side_yellow}
                other_style={{fontWeight: '600', width: {xs: '100%', md: '40%', lg: '30'}}}
              />
          </CardContent>
        </div>
  )
}
