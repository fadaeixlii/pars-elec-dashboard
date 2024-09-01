import { toast } from 'react-toastify'

const ToastHelper = {
  success(message: string) {
    toast(message, {
      type: 'success',
      autoClose: 1000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  },
  error(message: string) {
    toast(message, {
      type: 'error',
      autoClose: 1000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  },
  warning(message: string) {
    toast(message, {
      type: 'warning',
      autoClose: 1000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  },
  info(message: string) {
    toast(message, {
      type: 'info',
      autoClose: 1000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  },
}

export default ToastHelper
