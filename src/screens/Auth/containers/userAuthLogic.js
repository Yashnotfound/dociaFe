import { useContext } from "react";
import api from "../../../Shared/utils/api";
import { toast } from "react-hot-toast";
import { storeInSession } from "./session";
import { UserContext } from "../../../App";

const userAuthLogic = () => {
  const { setUserAuth } = useContext(UserContext);

  const userAuthThroughServer = async (serverRoute, formData) => {
    try {
      const response = await api.post(`/auth${serverRoute}`, formData);
      storeInSession("user", JSON.stringify(response.data));
      setUserAuth(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      throw err;
    }
  };

  return { userAuthThroughServer };
};

export default userAuthLogic;
