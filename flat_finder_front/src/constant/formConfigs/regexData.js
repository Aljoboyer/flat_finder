export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; 

export const emailRegex = /\S+@\S+\.\S+/;

export const nameRegex = /^[A-Za-z\s]*$/;

export const phoneRegex = /^\d{11}$/;

export const numberRegex = /^[1-9][0-9]*$/