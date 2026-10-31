import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../App";
import Navbar from "./Navbar";
import NoticeHeroSectionDetails from "./NoticeHeroSectionDetails";
import FullNotice from "./FullNotice";
import Footer from "./Footer";

function NoticeDetails() {
  const { id } = useParams();

  useEffect(() => {
    const increaseView = async () => {
      try {
        await axios.patch(
          `${serverURL}/api/notice/${id}/view`,
          {},
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.log("View count error:", error);
      }
    };

    if (id) increaseView();
  }, [id]);

  return (
    <div>
      <Navbar />
      <NoticeHeroSectionDetails />
      <FullNotice />
      <Footer />
    </div>
  );
}

export default NoticeDetails;
