import { cities } from "@/components/visitors/LandingPage/HeroSection";

export  const filterFieldConfig = [
      {
        options: cities,
        label: 'City Name',
        inputType: 'autocomplete'
      },
      {
        options: cities,
        label: 'Area Name',
        inputType: 'autocomplete'
      }
    ]