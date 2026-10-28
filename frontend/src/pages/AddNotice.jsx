import React, { useRef, useState } from "react";
import logoimage from "../assets/login-logo.png";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoEyeSharp } from "react-icons/io5";
import {
  MdDeleteForever,
  MdFormatBold,
  MdFormatUnderlined,
  MdOutlineFormatItalic,
  MdOutlineWatchLater,
} from "react-icons/md";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaFileAlt,
  FaTelegramPlane,
  FaWpforms,
} from "react-icons/fa";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { BsAlphabetUppercase } from "react-icons/bs";
import { RxCross2, RxLetterCaseLowercase } from "react-icons/rx";
import { FiUploadCloud, FiPaperclip, FiX, FiFile } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { RiResetLeftFill } from "react-icons/ri";
import { FcIdea, FcOk } from "react-icons/fc";
import axios from "axios";
import { serverURL } from "../App";
import { GoAlertFill } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNoticeData } from "../redux/noticeSlice";

function AddNotice() {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [category, setCategory] = useState("");
  const categoryName = ["General", "Academic", "Exam", "Holiday", "Event"];
  const [priority, setPriority] = useState("");
  const priorityName = ["Normal", "Hight", "Low"];
  const [status, setStatus] = useState("");
  const statusName = ["Active", "Inactive", "Scheduled"];
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [expiryDate, setExpriryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[130px] outline-none",
      },
    },
  });

  const handleUppercase = () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;

    if (from === to) return;

    const selectedText = editor.state.doc.textBetween(from, to);

    editor
      .chain()
      .focus()
      .insertContentAt({ from, to }, selectedText.toUpperCase())
      .run();
  };

  const handleLowercase = () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;

    if (from === to) return;

    const selectedText = editor.state.doc.textBetween(from, to);

    editor
      .chain()
      .focus()
      .insertContentAt({ from, to }, selectedText.toLowerCase())
      .run();
  };

  const handleDelete = () => {
    editor?.commands.clearContent();
    setDescription("");
  };

  const fileInputRef = useRef(null);
  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles);

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleAddNotice = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("noticeTitle", noticeTitle);
      formData.append("category", category);
      formData.append("priority", priority);
      formData.append("status", status);
      formData.append("description", description);
      formData.append("publishDate", publishDate);

      files.forEach((file) => {
        formData.append("files", file);
      });

      if (expiryDate) {
        formData.append("expiryDate", expiryDate);
      }

      const result = await axios.post(
        `${serverURL}/api/notice/add-notice`,
        formData,
        { withCredentials: true },
      );

      dispatch(setNoticeData(result.data));
      setLoading(false);
      setErr("");
      navigate("/admin-dashboard/notice/notice-list");
    } catch (error) {
      setLoading(false);
      setErr(error.response?.data?.message);
      console.log(error);
      console.log(error.response?.data?.message);
    }
  };

  const handleReset = () => {
    setNoticeTitle("");
    setCategory("");
    setPriority("");
    setStatus("");
    setDescription("");
    setFiles([]);
    setExpriryDate("");
  };

  return (
    <div className="flex bg-blue-50">
      <Menu />
      {/* notice add section */}

      <div className=" w-full ">
        {/* admin header */}
        <AdminHeader />
        {/* add notice */}
        <div className="p-2">
          {/* add new notice */}
          <div className="flex items-center gap-4">
            <TfiAnnouncement size={40} className="text-green-700" />
            <div>
              <h1 className="font-bold text-xl">Add New Notice</h1>
              <p>
                Create a new notice or announcement for students, teachers and
                parents.
              </p>
            </div>
          </div>

          <div className="flex gap-5 mt-4">
            <div className="bg-white rounded-[8px] w-[684px] shadow p-3">
              {/* 1. Basic Information */}
              <div>
                <div className="flex items-center gap-3">
                  <FaWpforms size={20} className="text-green-900" />
                  <h4 className="font-bold ">1. Basic Information</h4>
                </div>
                <div>
                  <div className="flex items-center gap-4 mt-3">
                    {/* notice title */}
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">
                        Notice Title <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        placeholder="Enter notice title..."
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        className="outline-none w-90 py-1 px-2 border border-gray-300 rounded-[8px]"
                      />
                    </div>
                    {/* category */}
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">
                        Category <span className="text-red-500">*</span>
                      </label>

                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none w-70 py-1.5 px-2 border border-gray-300 rounded-[8px]"
                      >
                        <option>Select Category</option>
                        {categoryName.map((e, index) => (
                          <option key={index}>{e}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    {/* priority */}
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">
                        Priority <span className="text-red-500">*</span>
                      </label>

                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="outline-none w-90 py-1.5 px-2 border border-gray-300 rounded-[8px]"
                      >
                        <option>Select Priority</option>
                        {priorityName.map((e, index) => (
                          <option key={index}>{e}</option>
                        ))}
                      </select>
                    </div>
                    {/* status */}
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">
                        Status <span className="text-red-500">*</span>
                      </label>

                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="outline-none w-70 py-1.5 px-2 border border-gray-300 rounded-[8px]"
                      >
                        <option>Select Status</option>
                        {statusName.map((e, index) => (
                          <option key={index}>{e}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* notice content */}
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaFileAlt size={20} className="text-green-900" />
                  <h4 className="font-bold">2. Notice Contact</h4>
                </div>
                <div className="mt-2">
                  <label className="font-semibold">
                    Description <span className="text-red-500">*</span>
                  </label>

                  <div className="border border-gray-300 rounded-[8px] mt-2">
                    {/* menu button */}
                    <div className="bg-blue-50 flex items-center p-2 border-b border-gray-300 gap-3 rounded-tl-[8px] rounded-tr-[8px]">
                      {/* Bold */}
                      <button
                        type="button"
                        title="Bold"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                        className={`cursor-pointer p-1 rounded ${
                          editor?.isActive("bold")
                            ? "bg-blue-200 text-blue-700"
                            : ""
                        }`}
                      >
                        <MdFormatBold size={20} />
                      </button>

                      {/* Italic */}
                      <button
                        type="button"
                        title="Italic"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                        className={`cursor-pointer p-1 rounded ${
                          editor?.isActive("italic")
                            ? "bg-blue-200 text-blue-700"
                            : ""
                        }`}
                      >
                        <MdOutlineFormatItalic size={20} />
                      </button>

                      {/* Underline */}
                      <button
                        type="button"
                        title="Underline"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                        className={`cursor-pointer p-1 rounded ${
                          editor?.isActive("underline")
                            ? "bg-blue-200 text-blue-700"
                            : ""
                        }`}
                      >
                        <MdFormatUnderlined size={20} />
                      </button>

                      {/* Align Left */}
                      <button
                        type="button"
                        title="Align Left"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                          editor?.chain().focus().setTextAlign("left").run()
                        }
                        className="cursor-pointer p-1"
                      >
                        <FaAlignLeft />
                      </button>

                      {/* Align Center */}
                      <button
                        type="button"
                        title="Align Center"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                          editor?.chain().focus().setTextAlign("center").run()
                        }
                        className="cursor-pointer p-1"
                      >
                        <FaAlignCenter />
                      </button>

                      {/* Align Right */}
                      <button
                        type="button"
                        title="Align Right"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                          editor?.chain().focus().setTextAlign("right").run()
                        }
                        className="cursor-pointer p-1"
                      >
                        <FaAlignRight />
                      </button>

                      {/* upperCase */}
                      <button
                        type="button"
                        title="Uppercase"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleUppercase}
                        className="cursor-pointer p-1"
                      >
                        <BsAlphabetUppercase size={22} />
                      </button>

                      {/* lowerCase */}
                      <button
                        type="button"
                        title="Lowercase"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleLowercase}
                        className="cursor-pointer p-1"
                      >
                        <RxLetterCaseLowercase size={22} />
                      </button>

                      {/* delete text */}
                      <button
                        onClick={handleDelete}
                        className="cursor-pointer p-1"
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </div>

                    {/* description */}
                    <div className="bg-white p-2">
                      <EditorContent
                        editor={editor}
                        placeholder="Write your notice details here..."
                        rows={5}
                        value={description.text}
                        onChange={(e) =>
                          setDescription((prev) => ({
                            ...prev,
                            text: e.target.value,
                          }))
                        }
                        className={`w-full resize-none outline-none ${description.isBold ? "font-bold" : "font-normal"}`}
                      />
                    </div>
                    {/* count length */}
                    <div className="bg-blue-50 flex justify-end p-2 border-t border-gray-300 gap-3 rounded-bl-[8px] rounded-br-[8px]">
                      <p className="text-[14px] text-gray-500">
                        {editor?.getText().length ?? 0} Characters
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attachments Section */}
              <div className="mt-6">
                <div className="mb-4 flex items-center gap-2">
                  <FiPaperclip className="text-xl text-teal-700" />

                  <h2 className="font-bold text-slate-800">
                    3. Attachments
                    <span className="ml-1 font-normal text-gray-400">
                      (Optional)
                    </span>
                  </h2>
                </div>

                {/* Upload Area */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex min-h-[105px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-5 text-center transition hover:border-teal-500 hover:bg-teal-50/40"
                >
                  <FiUploadCloud className="mb-2 text-4xl text-slate-400" />

                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-teal-700">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => {
                      handleFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </div>

                {/* Selected Files */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="rounded-lg bg-teal-100 p-2 text-teal-700">
                            <FiFile size={20} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-700">
                              {file.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          title="Remove file"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(index);
                          }}
                          className="shrink-0 rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* date */}
              <div className="flex items-center justify-between gap-4 mt-4">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">
                    Publish Date <span className="text-red-500">*</span>
                  </label>

                  <input
                    value={new Date(publishDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    readOnly
                    className="outline-none w-80 py-1 px-2 border border-gray-300 rounded-[8px]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">
                    Expiry Date{" "}
                    <span className="font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpriryDate(e.target.value)}
                    className="outline-none w-80 py-1 px-2 border border-gray-300 rounded-[8px]"
                  />
                </div>
              </div>

              {/* button */}
              <div className="flex justify-end mt-5 gap-4">
                {/* reset button */}
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                  onClick={handleReset}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <RiResetLeftFill /> Reset
                  </span>
                  <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                </button>

                {/* add button */}
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                  onClick={handleAddNotice}
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    {loading ? (
                      <ClipLoader color="white" />
                    ) : (
                      <>
                        <FaTelegramPlane /> Publish Notice
                      </>
                    )}
                  </span>
                  <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </button>

                {loading && (
                  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
                    {/* Loading Card */}
                    <div className="w-[90%] max-w-[520px] rounded-3xl bg-white px-8 py-10 sm:px-12 shadow-2xl text-center">
                      {/* Spinner + Logo */}
                      <div className="relative mx-auto mb-7 flex h-44 w-44 items-center justify-center">
                        {/* Spinner */}
                        <div className="absolute inset-0 rounded-full border-[12px] border-slate-200 border-t-green-500 border-r-cyan-500 animate-spin"></div>

                        {/* Logo Circle */}
                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-blue-50">
                          <img
                            src={logoimage}
                            alt="EduManage"
                            className="h-20 w-20 object-contain"
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl font-bold text-[#102A5C]">
                        Please wait...
                      </h2>

                      {/* Description */}
                      <p className="mt-3 text-base text-slate-500">
                        Create the notice.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* notice preview */}
            <div>
              <div className="bg-white p-3 rounded-[8px] min-w-[320px] shadow">
                <h1 className="flex items-center gap-3 font-bold">
                  <IoEyeSharp /> Notice Preview
                </h1>

                <div className="bg-green-50 mt-3 rounded-[8px] border border-green-400 p-3">
                  <div className=" flex items-center justify-between">
                    {/* category */}
                    <div>
                      {category === "General" ? (
                        <div className="w-22 font-semibold bg-green-200 text-green-700 rounded-full flex items-center justify-center">
                          <p>{category}</p>
                        </div>
                      ) : category === "Academic" ? (
                        <div className="w-22 font-semibold bg-blue-200 text-blue-500 rounded-full flex items-center justify-center">
                          <p>{category}</p>
                        </div>
                      ) : category === "Exam" ? (
                        <div className="w-22 font-semibold bg-[#d0cfeb] text-[#4840e8] rounded-full flex items-center justify-center">
                          <p>{category}</p>
                        </div>
                      ) : category === "Holiday" ? (
                        <div className="w-22 font-semibold bg-pink-200 text-pink-500 rounded-full flex items-center justify-center">
                          <p>{category}</p>
                        </div>
                      ) : category === "Event" ? (
                        <div className="w-22 font-semibold bg-orange-200 text-orange-500 rounded-full flex items-center justify-center">
                          <p>{category}</p>
                        </div>
                      ) : (
                        <div className="w-22 font-semibold bg-black text-white rounded-[8px] flex items-center justify-center">
                          Category
                        </div>
                      )}
                    </div>
                    {/*publish date */}
                    <div className="text-xs text-gray-500">
                      <p>
                        {new Date(publishDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* text */}
                  <div className="mt-2">
                    {/* notice title */}
                    <div>
                      {noticeTitle ? (
                        <h1 className="text-xl capitalize font-semibold">
                          {noticeTitle}
                        </h1>
                      ) : (
                        <h1 className="text-xl font-semibold text-gray-700">
                          Notice Title
                        </h1>
                      )}
                    </div>
                    {/* notice details */}
                    <div className="mt-2 overflow-auto max-h-30">
                      <div className="mt-2 overflow-auto max-h-30">
                        {description ? (
                          <div
                            className="whitespace-pre-wrap break-words"
                            dangerouslySetInnerHTML={{ __html: description }}
                          />
                        ) : (
                          <p>Write your notice details here...</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                      {/* vaild date */}
                      <div className="flex items-center text-xs gap-2 text-gray-400">
                        <MdOutlineWatchLater />
                        {expiryDate ? (
                          <p>
                            Vaild until:{" "}
                            {new Date(expiryDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}{" "}
                          </p>
                        ) : (
                          <p>Vaild Until: None</p>
                        )}
                      </div>
                      {/* status */}
                      <div>
                        {status === "Active" ? (
                          <div className="w-22 font-semibold bg-green-200 text-green-700 rounded-full flex items-center justify-center">
                            <p>{status}</p>
                          </div>
                        ) : status === "Inactive" ? (
                          <div className="w-22 font-semibold bg-yellow-200 text-yellow-700 rounded-full flex items-center justify-center">
                            <p>{status}</p>
                          </div>
                        ) : status === "Scheduled" ? (
                          <div className="w-26 font-semibold bg-blue-200 text-blue-500 rounded-full flex items-center justify-center">
                            <p>{status}</p>
                          </div>
                        ) : (
                          <div className="w-22 font-semibold bg-black text-white rounded-[8px] flex items-center justify-center">
                            status
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-[8px] min-w-[320px] mt-4 shadow">
                <h1 className="flex items-center gap-3 font-bold">
                  <FcIdea size={20} /> Quick Tips
                </h1>
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex items-center gap-3 ">
                    <FcOk />
                    <p className="text-[14px] text-gray-600">
                      Use a clear and short title for your notice.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ">
                    <FcOk />
                    <p className="text-[14px] text-gray-600">
                      Choose the correct category.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ">
                    <FcOk />
                    <p className="text-[14px] text-gray-600">
                      Set the priority level(Low, Normal, Hight).
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ">
                    <FcOk />
                    <p className="text-[14px] text-gray-600">
                      Add expriry date if the notice is temporary.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ">
                    <FcOk />
                    <p className="text-[14px] text-gray-600">
                      You can attach files (PDF, Images, etc).
                    </p>
                  </div>
                  <div className="flex gap-3 ">
                    <FcOk />
                    <div>
                      <p className="text-[14px] text-gray-600">
                        Make sure to click "Publish Notice" after
                      </p>
                      <p className="text-[14px] text-gray-600">
                        filling all the details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {err && (
          <>
            <div className="fixed z-60 inset-0 bg-black/50 flex justify-center items-center">
              <div className="bg-white p-5 rounded-[8px]">
                <div
                  className="flex justify-end text-gray-600 cursor-pointer"
                  onClick={() => setErr("")}
                >
                  <RxCross2 />
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className=" p-3 rounded-full bg-red-100 text-red-500">
                    <GoAlertFill size={30} />
                  </div>
                  <h1 className="text-xl font-bold">Something went wrong</h1>
                  <p className="text-gray-500">Please try again latet.</p>
                  <div className="bg-red-100 border border-red-700 w-full p-4 rounded-[8px]">
                    <div className="flex items-center gap-3 text-red-500">
                      <GoAlertFill size={30} />
                      {err}
                    </div>
                  </div>
                  <button
                    className="bg-red-600 cursor-pointer px-15 text-white py-2 rounded-[8px]"
                    onClick={() => setErr("")}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddNotice;
