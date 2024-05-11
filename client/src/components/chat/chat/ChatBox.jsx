import { useContext, useEffect, useState } from "react";

import { Box } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { getConversation } from "../../../service/api.js";

// components
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

const ChatBox = ({ openDrawer, setOpenDrawer }) => {
  const { person, account } = useContext(AccountContext);

  const [conversation, setConversation] = useState({});

  const [formData, setFormData] = useState({
    name: person.name,
    phone: "",
    birthday: "",
    country: "",
    gender: "",
    email: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    formData.name = person.name;

    const getConversationDetails = async () => {
      let data = await getConversation({
        senderId: account.sub,
        receiverId: person.sub,
      });
      setConversation(data);
    };
    getConversationDetails();
  }, [person.sub]);

  return (
    <Box style={{ height: "75%" }}>
      <ChatHeader person={person} />
      <Messages person={person} conversation={conversation} />

      {/*  drawer component  */}
      <div
        className={`${
          openDrawer
            ? "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
            : "hidden"
        }`}
      >
        <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Profile
        </h5>

        <button
          type="button"
          onClick={() => setOpenDrawer(false)}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="birthday"
              className="block text-gray-700 font-bold mb-2"
            >
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-700 font-bold mb-2"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Gender</label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-6">
            <label
              for="note"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Note
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your note..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </Box>
  );
};

export default ChatBox;
