
import { useEffect } from "react";
import axios from "axios";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setAdminData } from "../redux/adminSlice";

function useGetCurrentAdmin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/admin-auth/get-admin`,
          { withCredentials: true }
        );

        dispatch(setAdminData(result.data.admin));
      } catch (error) {
        console.log(
          "Get admin error:",
          error.response?.status,
          error.response?.data || error.message
        );
      }
    };

    fetchAdmin();
  }, [dispatch]);
}

export default useGetCurrentAdmin;
