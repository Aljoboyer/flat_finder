const { default: toast } = require("react-hot-toast");


export const errorToast = () => {
    toast.error('Something went wrong pleae try again!');
}

export const successToast = (msg) => {
    toast.success(msg);
}