import { COLORS } from "@/theme/colors";
import toast from "react-hot-toast";
import { TfiAnnouncement } from "react-icons/tfi";


export const errorToast = (msg = 'Something went wrong pleae try again!') => {
    toast.error(msg);
}

export const successToast = (msg) => {
    toast.success(msg);
}


export const notificationToast = (msg) => {
    toast.success(msg, {icon: <TfiAnnouncement color={COLORS.yellowOverlay}  size={30}/>});
}