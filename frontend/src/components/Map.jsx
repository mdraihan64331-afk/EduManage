import React from "react";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { ImPhone } from "react-icons/im";
import { IoLocation } from "react-icons/io5";
import { MdEmail, MdWatchLater } from "react-icons/md";

function Map() {
  return (
    <div className="mt-5 px-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr] h-auto lg:h-[278px]">
        {/* Google Map */}
        <div className="h-[220px] lg:h-full min-w-0">
          <iframe
            title="EduManage School Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49930095498!2d90.25487217580321!3d23.781067239709326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1792944537930!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full rounded-[14px]"
          />
        </div>

        {/* Our Location */}
        <div className="min-w-0 bg-green-50 rounded-[14px] p-3 shadow border border-gray-300">
          <div className="flex gap-3 border-b border-gray-200 pb-3">
            <div className="h-7 mt-1 w-7 shrink-0 flex items-center justify-center bg-green-300 text-green-700 rounded-full">
              <IoLocation size={18} />
            </div>

            <div className="min-w-0">
              <h4 className="text-green-600 font-bold">Our Location</h4>

              <div className="text-[14px] text-gray-500">
                <p>123 Education Street, Dhanmondi</p>
                <p>Dhaka-1205, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-3">
            <div className="h-7 mt-1 w-7 shrink-0 flex items-center justify-center bg-green-300 text-green-700 rounded-full">
              <ImPhone size={18} />
            </div>

            <div className="text-[14px] text-gray-500">
              <p>+880 1234-567890</p>
              <p>+880 1234-567890</p>
            </div>
          </div>

          <div className="flex gap-3 mt-3">
            <div className="h-7 mt-1 w-7 shrink-0 flex items-center justify-center bg-green-300 text-green-700 rounded-full">
              <MdEmail size={18} />
            </div>

            <div className="text-[14px] text-gray-500">
              <p>info@edumanage.com</p>
              <p>support@edumanage.com</p>
            </div>
          </div>

          <div className="flex gap-3 mt-3">
            <div className="h-7 mt-1 w-7 shrink-0 flex items-center justify-center bg-green-300 text-green-700 rounded-full">
              <MdWatchLater size={18} />
            </div>

            <div className="text-[14px] text-gray-500">
              <p>Saturday - Thursday</p>
              <p>9:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center bg-green-100 rounded-[8px] ">
        <div className="flex flex-col items-center justify-center py-2">
          <h4 className="font-bold">Follow Us on Social Media</h4>
          <p className="mt-1 text-[14px] text-gray-500">Stay connected with us for the latest updates, news and more.</p>
          <div className="flex items-center gap-4 mt-2">
            <div>
              <FaFacebookSquare className="text-blue-600" size={25} />
            </div>
            <div>
              <FaSquareXTwitter size={25} />
            </div>
            <div>
              <FaLinkedin className="text-[#0A66C2]" size={25} />
            </div>
            <div>
              <FaInstagramSquare className="text-[#e1306c]" size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
