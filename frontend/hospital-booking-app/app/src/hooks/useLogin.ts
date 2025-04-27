import { useState } from "react";
import { LOGIN_USER_MUTATION } from "../mutation/login.mutations";
import { useMutation } from "@apollo/client";
import ToastPopUp from "../utils/Toast";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/features/users/slice";

interface LoginInput {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [loginMutation] = useMutation(LOGIN_USER_MUTATION);

  const handleLogin = async (input: LoginInput) => {
    try {
      setLoading(true);
      setErrorMessage(null); // Clear any previous error messages

      const response = await loginMutation({
        variables: { input: input },
      });

      console.log("response", response);

      dispatch(setUser(response.data.loginUser));

      //   return response;
    } catch (error: any) {
      console.error("Login Failed:", error);

      // Check if it's an invalid credentials error
      if (
        error.message.includes("UnauthorizedException") ||
        error.message.includes("Password invalid")
      ) {
        ToastPopUp("Incorrect email or password. Please try again.");
      } else {
        ToastPopUp("An unexpected error occurred. Please try again later.");
      }

      throw error; // Optionally re-throw the error if needed for other handling
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, errorMessage };
};
