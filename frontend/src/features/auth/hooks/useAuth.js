import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginEmployee, registerEmployee } from "../state/auth/authAction";
import axiosInstance from "../../../config/axiosInstance";
export const useAuth = () => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requestHandleLoginSubmit = async (data) => {
    try {
      dispatch(loginEmployee(data));
      navigate('/home')
    } catch (error) {
      console.log("error in login", error);
    }
  };
  
  const requestHandleRegisterSubmit=async(data)=>{
    try {
      dispatch(registerEmployee(data));
      navigate('/home')
    } catch (error) {
        console.log('error in register',error)
    }
  }

  return {
    requestHandleLoginSubmit,
    requestHandleRegisterSubmit,
    register,
    handleSubmit,
    errors,
    dispatch,
    navigate,
  };
};
