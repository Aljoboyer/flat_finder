import { cities } from "@/components/visitors/LandingPage/HeroSection";

export  const filterFieldConfig = [
      {
        options: cities,
        textFieldLabel: 'City Name',
        inputType: 'autocomplete'
      },
      {
        options: cities,
        textFieldLabel: 'Area Name',
        inputType: 'autocomplete'
      }
    ]