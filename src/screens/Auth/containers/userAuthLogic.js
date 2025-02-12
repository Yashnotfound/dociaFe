import {useContext} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { storeInSession } from "../../../utils/session";
import { UserContext } from "../../../App";

const userAuthLogic = () => {
  const { setUserAuth } = useContext(UserContext);
  const userAuthThroughServer = async(serverRoute, formData) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/auth${serverRoute}`,
        formData
      );
      storeInSession("user", JSON.stringify(res.data));
      setUserAuth(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return { userAuthThroughServer };
};

export default userAuthLogic;