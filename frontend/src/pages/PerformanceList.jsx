import React from "react";
import { GrDocumentPerformance } from "react-icons/gr";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import { IoPerson } from "react-icons/io5";
import { FaRegStar, FaTrophy } from "react-icons/fa";
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";

function PerformanceList() {
  const { performanceData } = useSelector((state) => state.performance);

  const performances = Array.isArray(performanceData?.performances)
    ? performanceData.performances
    : [];

  const now = new Date();

  const totalAverage =
    performances.length > 0
      ? performances.reduce(
          (total, performance) =>
            total + (Number(performance?.overallPercentage) || 0),
          0,
        ) / performances.length
      : 0;

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  // Current Month Data
  const currentMonthData = performances.filter((item) => {
    const date = new Date(item.createdAt);

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  // Previous Month Data
  const previousMonthData = performances.filter((item) => {
    const date = new Date(item.createdAt);

    return (
      date.getMonth() === previousMonth && date.getFullYear() === previousYear
    );
  });

  // Average Calculation
  const getAverage = (data) => {
    if (!data.length) return 0;

    return (
      data.reduce(
        (total, item) => total + (Number(item.overallPercentage) || 0),
        0,
      ) / data.length
    );
  };

  const currentAverage = getAverage(currentMonthData);
  const previousAverage = getAverage(previousMonthData);

  // Percentage Change
  const percentageChange =
    previousAverage > 0
      ? ((currentAverage - previousAverage) / previousAverage) * 100
      : 0;

  const excellent = performances.filter((performance) => {
    return performance.overallPercentage >= 80;
  }).length;

  const todayRecords = performances.filter((performance) => {
    return (
      new Date(performance?.date).toLocaleDateString("en-CA") ===
      now.toLocaleDateString("en-CA")
    );
  }).length;

  // Monthly Percentage Change
  const monthlyChange = percentageChange;

  // Yesterday Records
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const yesterdayRecords = performances.filter((performance) => {
    return (
      new Date(performance?.date).toLocaleDateString("en-CA") ===
      yesterday.toLocaleDateString("en-CA")
    );
  }).length;

  // Today Percentage Change
  const todayChange =
    yesterdayRecords > 0
      ? ((todayRecords - yesterdayRecords) / yesterdayRecords) * 100
      : 0;

  return (
    <div className="flex bg-blue-50">
      <Menu />

      <div className=" w-full ">
        {/* admin header */}
        <AdminHeader />

        <div className="p-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GrDocumentPerformance size={40} className="text-green-700" />
              <div>
                <h1 className="text-2xl font-bold">Performance List</h1>
                <p>
                  Track the student's daily learning and classroom activities.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 py-4">
            <div className="grid grid-cols-4 gap-4">
              {/* total Records */}

              <div className="h-30 w-full bg-white flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <IoPerson size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total Records</p>
                  <h1 className="font-bold text-2xl">
                    {performanceData?.performances?.length || 0}
                  </h1>
                  <p className="text-xs text-gray-400">Registered students</p>
                </div>
              </div>

              {/* Average performance */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-blue-100 rounded-xl p-2">
                  <FaTrophy size={25} className="text-blue-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Average Performance</p>
                  <h1 className="font-bold text-2xl">
                    {totalAverage.toFixed(2) + "%"}
                  </h1>
                  <p
                    className={`text-xs flex items-center gap-2 ${
                      percentageChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {percentageChange >= 0 ? (
                      <IoMdArrowUp />
                    ) : (
                      <IoMdArrowDown />
                    )}

                    {previousAverage > 0
                      ? `${Math.abs(percentageChange).toFixed(1)}% ${
                          percentageChange >= 0 ? "up" : "down"
                        } this month`
                      : "No previous month data"}
                  </p>
                </div>
              </div>

              {/* Excellent students */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-purple-200 rounded-xl p-2">
                  <FaRegStar size={25} className="text-purple-700" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Excellent Students</p>
                  <h1 className="font-bold text-2xl">{excellent}</h1>
                  <p
                    className={`text-xs flex items-center gap-2 ${
                      monthlyChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {monthlyChange >= 0 ? <IoMdArrowUp /> : <IoMdArrowDown />}

                    {previousAverage > 0
                      ? `${Math.abs(monthlyChange).toFixed(1)}% ${
                          monthlyChange >= 0 ? "up" : "down"
                        } this month`
                      : "No previous month data"}
                  </p>
                </div>
              </div>

              {/* today's records */}
              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <MdEventAvailable size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Today's Records</p>
                  <h1 className="font-bold text-2xl">{todayRecords}</h1>
                  <p
                    className={`text-xs flex items-center gap-2 ${
                      todayChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {todayChange >= 0 ? <IoMdArrowUp /> : <IoMdArrowDown />}

                    {yesterdayRecords > 0
                      ? `${Math.abs(todayChange).toFixed(1)}% ${
                          todayChange >= 0 ? "up" : "down"
                        } Today`
                      : "No yesterday data"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceList;
