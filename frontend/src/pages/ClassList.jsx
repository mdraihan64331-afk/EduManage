import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { serverURL } from "../App";
import axios from "axios";

function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/classes/all-classes`, {
          withCredentials: true,
        });

        console.log(result.data);
        setClasses(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClasses();
  }, []);
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          {classes.map((item) => (
            <div key={item._id}>
              <p>{item.className}</p>
              <p>{item.classTeacher?.fullName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClassList;
