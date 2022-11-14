import { ToastContainer, toast } from "react-toastify";

const notcompleteToast = () => {
  toast.error("완성되지 않은 수식입니다", {
    autoClose: 500,
    position: toast.POSITION.TOP_CENTER,
  });
};

const cantzerodivisionToast = () => {
  toast.error("0으로 나눌 수 없습니다", {
    autoClose: 500,
    position: toast.POSITION.TOP_CENTER,
  });
};

const lengthcheckToast = () => {
  toast.error("15자리까지 입력할 수 있어요", {
    autoClose: 500,
    position: toast.POSITION.TOP_CENTER,
  });
};

const calcullengthcheckToast = () => {
  toast.error("15자리까지만 계산 가능합니다", {
    autoClose: 500,
    position: toast.POSITION.TOP_CENTER,
  });
};

export {
  notcompleteToast,
  lengthcheckToast,
  cantzerodivisionToast,
  calcullengthcheckToast,
};
