import React, { useState } from "react";
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
  FaWpforms,
} from "react-icons/fa";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { BsAlphabetUppercase } from "react-icons/bs";
import { RxLetterCaseLowercase } from "react-icons/rx";

function AddNotice() {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [category, setCategory] = useState("");
  const categoryName = ["General", "Academic", "Exam", "Holiday", "Event"];
  const [priority, setPriority] = useState("");
  const priorityName = ["Normal", "Hight", "Low"];
  const [status, setStatus] = useState("");
  const statusName = ["Active", "Inactive", "Scheduled"];
  const [description, setDescription] = useState("");

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

  return (
    <div className="flex bg-blue-50">
      <Menu />
      {/* student add section */}

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
              <div className="flex items-center gap-3">
                <FaWpforms size={20} className="text-green-900" />
                <h4 className="font-bold ">1. Basic Information</h4>
              </div>

              <div className="flex items-center gap-4 mt-4">
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

              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaFileAlt size={20} className="text-green-900" />
                  <h4>2. Notice Contact</h4>
                </div>
                <div className="mt-5">
                  <label>
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
            </div>

            {/* notice preview */}
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
                      <div className="w-22 font-semibold bg-blue-200 text-blue-500 rounded-full flex items-center justify-center">
                        <p>{category}</p>
                      </div>
                    ) : category === "Holiday" ? (
                      <div className="w-22 font-semibold bg-red-200 text-red-500 rounded-full flex items-center justify-center">
                        <p>{category}</p>
                      </div>
                    ) : category === "Event" ? (
                      <div className="w-22 font-semibold bg-red-200 text-red-500 rounded-full flex items-center justify-center">
                        <p>{category}</p>
                      </div>
                    ) : (
                      <div className="w-22 font-semibold bg-black text-white rounded-[8px] flex items-center justify-center">
                        Category
                      </div>
                    )}
                  </div>
                  {/* date */}
                  <div className="text-xs text-gray-500">
                    <p>28 Apr 2025</p>
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
                      <p>Vaild until: 05 May 2025</p>
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
                        <div className="w-22 font-semibold bg-blue-200 text-blue-500 rounded-full flex items-center justify-center">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNotice;
