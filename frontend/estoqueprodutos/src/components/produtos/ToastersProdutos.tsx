import { toast } from 'react-toastify';

export const sucessToast = (tipo: string) => {
  toast.success(`Produto ${tipo} com sucesso`, {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     });
}

export const errorToast = (tipo: string) => {
  toast.error(`Produto não foi ${tipo}`, {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     });
}

export const warningToast = (tipo: string) => {
  toast.warning(`Campo ${tipo} não foi preenchido`, {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     });
}