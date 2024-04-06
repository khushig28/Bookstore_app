import { ToastContainer, toast } from 'react-toastify';


export const TOAST_SUCCESS = (message)=>{
    toast.success(message|| 'Action succesful.');
}
export const TOAST_FAILURE = (message)=>{
    toast.error(message|| 'Something went wrong.');
}