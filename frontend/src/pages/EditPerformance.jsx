import React, { useEffect, useState } from "react";
import logoimage from "../assets/login-logo.png";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";
import { GrDocumentPerformance } from "react-icons/gr";
import { serverURL } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPerformanceData } from "../redux/performanceSlice";
import { GoAlertFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { IoMdSave } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { RiResetLeftFill } from "react-icons/ri";

const initialForm = {
  studentId: "",
  date: new Date().toLocaleDateString("en-CA"),
  subject: "Mathematics",
  classwork: 0,
  homework: 0,
  participation: 0,
  behavior: 0,
  learning: 0,
  teacherComment: "",
};

const scoreFields = [
  { name: "classwork", label: "Classwork" },
  { name: "homework", label: "Homework" },
  { name: "participation", label: "Participation" },
  { name: "behavior", label: "Behavior" },
  { name: "learning", label: "Learning & Understanding" },
];

function EditPerformance() {
  const { id } = useParams();

  const [formData, setFormData] = useState(initialForm);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total score
  const totalScore = scoreFields.reduce(
    (total, field) => total + Number(formData[field.name] || 0),
    0,
  );

  // Calculate percentage
  const percentage = (totalScore / 50) * 100;

  // Grade calculation
  const getGrade = () => {
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Good";
    if (percentage >= 40) return "Average";
    return "Needs Improvement";
  };

  // Fetch single performance
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setFetchLoading(true);

        const result = await axios.get(
          `${serverURL}/api/performance/get-all-performance`,
          { withCredentials: true },
        );

        // Backend response normalization
        const performances = Array.isArray(result.data)
          ? result.data
          : result.data?.performances ||
            result.data?.data?.performances ||
            result.data?.data ||
            [];

        const selectedPerformance = performances.find(
          (item) => item._id === id,
        );

        if (!selectedPerformance) {
          setErr("Performance record not found.");
          return;
        }

        const updatedForm = {
          studentId:
            selectedPerformance.student?.studentId ||
            selectedPerformance.studentId ||
            "",
          date: selectedPerformance.date
            ? selectedPerformance.date.slice(0, 10)
            : "",
          subject: selectedPerformance.subject || "Mathematics",
          classwork: selectedPerformance.classwork ?? 0,
          homework: selectedPerformance.homework ?? 0,
          participation: selectedPerformance.participation ?? 0,
          behavior: selectedPerformance.behavior ?? 0,
          learning: selectedPerformance.learning ?? 0,
          teacherComment: selectedPerformance.teacherComment || "",
        };

        setFormData(updatedForm);
        setOriginalData(updatedForm);
      } catch (error) {
        console.log(error);
        setErr(
          error.response?.data?.message || "Failed to load performance data.",
        );
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchPerformance();
    }
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErr("");
  };

  // Reset form
  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
    }

    setErr("");
  };

  // Update performance
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentId.trim()) {
      setErr("Please enter the Student ID.");
      return;
    }

    const invalidScore = scoreFields.some(({ name }) => {
      const value = Number(formData[name]);

      return !Number.isInteger(value) || value < 1 || value > 10;
    });

    if (invalidScore) {
      setErr("All scores must be between 1 and 10.");
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        ...formData,
        studentId: formData.studentId.trim(),
        subject: formData.subject.trim(),
        overallPercentage: percentage,
      };

      const result = await axios.put(
        `${serverURL}/api/performance/update-performance/${id}`,
        updateData,
        { withCredentials: true },
      );

      const response = await axios.get(
        `${serverURL}/api/performance/get-all-performance`,
        { withCredentials: true },
      );

      dispatch(setPerformanceData(response.data));

      setLoading(false);
      setErr("");

      navigate("/admin-dashboard/performances/list-performance");
    } catch (error) {
      console.log(error);

      setLoading(false);

      setErr(
        error.response?.data?.message ||
          "Failed to update performance. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Menu />

      <div className="w-full min-w-0">
        <AdminHeader />

        <div className="p-2">
          {/* Header */}
          <div className="flex items-center gap-4">
            <GrDocumentPerformance size={40} className="text-green-700" />

            <div className="mb-6">
              <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
                Edit Daily Performance
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Update the student's daily learning and classroom activities.
              </p>
            </div>
          </div>

          <div className="min-h-screen p-4 sm:p-6 lg:p-2">
            <div className="mx-auto max-w-5xl">
              {fetchLoading ? (
                <div className="flex min-h-[400px] items-center justify-center">
                  <ClipLoader size={50} color="#059669" />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student Information */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <h2 className="mb-5 text-lg font-bold text-slate-800">
                      Student Information
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Student ID *
                        </label>

                        <input
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleChange}
                          placeholder="e.g. STD-001"
                          required
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Date *
                        </label>

                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Subject *
                        </label>

                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                        >
                          <option value="Mathematics">Mathematics</option>
                          <option value="English">English</option>
                          <option value="Bangla">Bangla</option>
                          <option value="Science">Science</option>
                          <option value="ICT">ICT</option>
                          <option value="Social Science">Social Science</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* Performance Assessment */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <h2 className="mb-2 text-lg font-bold text-slate-800">
                      Performance Assessment
                    </h2>

                    <p className="mb-6 text-sm text-slate-500">
                      Give each category a score from 1 to 10.
                    </p>

                    <div className="space-y-6">
                      {scoreFields.map((field) => (
                        <div key={field.name}>
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <label
                              htmlFor={field.name}
                              className="text-sm font-medium text-slate-700"
                            >
                              {field.label}
                            </label>

                            <span className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                              {formData[field.name]}/10
                            </span>
                          </div>

                          <input
                            id={field.name}
                            type="range"
                            name={field.name}
                            min="1"
                            max="10"
                            step="1"
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="w-full cursor-pointer accent-emerald-600"
                          />

                          <div className="flex justify-between text-xs text-slate-400">
                            <span>1 - Needs support</span>
                            <span>10 - Excellent</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Overall Performance */}
                  <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-sm">
                    <p className="text-sm text-emerald-50">
                      Overall Performance
                    </p>

                    <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                      <h2 className="text-4xl font-extrabold">
                        {percentage.toFixed(0)}%
                      </h2>

                      <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                        {getGrade()}
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/25">
                      <div
                        className="h-full rounded-full bg-white transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <p className="mt-3 text-sm text-emerald-50">
                      Total score: {totalScore}/50
                    </p>
                  </section>

                  {/* Teacher Comment */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <label
                      htmlFor="teacherComment"
                      className="mb-3 block text-lg font-bold text-slate-800"
                    >
                      Teacher's Comment
                    </label>

                    <textarea
                      id="teacherComment"
                      name="teacherComment"
                      value={formData.teacherComment}
                      onChange={handleChange}
                      rows={4}
                      maxLength={1000}
                      placeholder="e.g. Good performance today."
                      className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </section>

                  {/* Buttons */}
                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={loading}
                      className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                        <RiResetLeftFill />
                        Reset
                      </span>

                      <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                        {loading ? (
                          <ClipLoader color="white" size={18} />
                        ) : (
                          <>
                            <IoMdSave />
                            Update Performance
                          </>
                        )}
                      </span>

                      <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                    </button>
                  </div>
                </form>
              )}

              {/* Loading Screen */}
              {loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
                  <div className="w-[90%] max-w-[520px] rounded-3xl bg-white px-8 py-10 text-center shadow-2xl sm:px-12">
                    <div className="relative mx-auto mb-7 flex h-44 w-44 items-center justify-center">
                      <div className="absolute inset-0 animate-spin rounded-full border-[12px] border-slate-200 border-t-green-500 border-r-cyan-500"></div>

                      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-blue-50">
                        <img
                          src={logoimage}
                          alt="EduManage"
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold text-[#102A5C]">
                      Please wait...
                    </h2>

                    <p className="mt-3 text-base text-slate-500">
                      Updating student performance.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Modal */}
              {err && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                  <div className="w-[90%] max-w-md rounded-xl bg-white p-5">
                    <div
                      className="flex cursor-pointer justify-end text-gray-600"
                      onClick={() => setErr("")}
                    >
                      <RxCross2 size={22} />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="rounded-full bg-red-100 p-3 text-red-500">
                        <GoAlertFill size={30} />
                      </div>

                      <h1 className="text-xl font-bold">
                        Something went wrong
                      </h1>

                      <p className="text-center text-gray-500">
                        Please check the error and try again.
                      </p>

                      <div className="w-full rounded-lg border border-red-700 bg-red-100 p-4">
                        <div className="flex items-center gap-3 text-red-500">
                          <GoAlertFill size={25} />
                          <span className="break-words">{err}</span>
                        </div>
                      </div>

                      <button
                        className="w-full cursor-pointer rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                        onClick={() => setErr("")}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPerformance;
