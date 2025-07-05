import toast from "react-hot-toast";



export const errorToast = (msg = 'Something went wrong pleae try again!') => {
    toast.error(msg);
}

export const successToast = (msg) => {
    toast.success(msg);
}