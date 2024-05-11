import { useContext, useEffect, useState } from "react";

import { Dialog, Box, styled } from "@mui/material";

import { AccountContext } from "../../context/AccountProvider";

// components
import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";

const Component = styled(Box)`
  display: flex;
`;
const LeftComponent = styled(Box)`
  min-width: 450px;
`;
const RightComponent = styled(Box)`
  width: 73%;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;
const dialogstyle = {
  height: "95%",
  margin: "20px",
  width: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};

const ChatDialog = () => {
  const { person } = useContext(AccountContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [filters, setFilters] = useState([]);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  const toggleFilterDrawer = () => {
    setOpenFilterDrawer(true);
  };

  const addFilter = (filterName) => {
    setFilters([...filters, { name: filterName, count: 0 }]);
  };

  const editFilter = (index, newName) => {
    const updatedFilters = [...filters];
    updatedFilters[index].name = newName;
    setFilters(updatedFilters);
  };

  const deleteFilter = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const [formData, setFormData] = useState({
    FilterName: "",
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
    addFilter(formData.FilterName);
    setFormData({
      FilterName: "",
    });
  };

  const handleEdit = (index, newName) => {
    editFilter(index, newName);
  };

  const handleDelete = (index) => {
    deleteFilter(index);
  };

  return (
    <>
      <Dialog
        open={true}
        PaperProps={{ sx: dialogstyle }}
        hideBackdrop={true}
        maxWidth={"md"}
      >
        <div className="flex justify-between">
          <ul className="flex list-none p-0">
            <img
              src={process.env.PUBLIC_URL + "/icon.png"}
              alt=""
              srcset=""
              className="h-6 w-6 px-5 z-10"
            />
            <li className="mr-6">
              <a
                className="text-black font-semibold hover:text-green-600 no-underline"
                href="#"
              >
                All <sup className="text-green-600">0</sup>
              </a>
            </li>
            <li className="mr-6">
              <a
                className="text-black font-semibold hover:text-green-600 no-underline"
                href="#"
              >
                Unread <sup className="text-green-600">0</sup>
              </a>
            </li>
            <li className="mr-6">
              <a
                className="text-black font-semibold hover:text-green-600 no-underline"
                href="#"
              >
                Awaiting Reply <sup className="text-green-600">0</sup>
              </a>
            </li>
            <li className="mr-6">
              <a
                className="text-black font-semibold hover:text-green-600 no-underline"
                href="#"
              >
                Needs Reply <sup className="text-green-600">0</sup>
              </a>
            </li>
            {filters.map((filter, index) => (
              <li key={index} className="mr-6">
                <a
                  className="text-black font-semibold hover:text-green-600 no-underline"
                  href="#"
                >
                  {filter.name}{" "}
                  <sup className="text-green-600">{filter.count}</sup>
                </a>
              </li>
            ))}
            <img
              src={process.env.PUBLIC_URL + "/plus.png"}
              onClick={() => toggleFilterDrawer()}
              alt=""
              srcset=""
              className="h-6 w-6 px-0 z-10"
            />
          </ul>
          <div
            className="flex justify-center items-center"
            onClick={() => toggleDrawer()}
          >
            <img
              src={process.env.PUBLIC_URL + "/contact-info.png"}
              alt=""
              srcset=""
              className="h-8 w-8 px-6 z-10"
            />
          </div>
        </div>

        <Component>
          {/* left component  */}
          <LeftComponent>
            <Menu />
          </LeftComponent>

          {/* right component */}
          <RightComponent>
            {Object.keys(person).length ? (
              <ChatBox openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
            ) : (
              <EmptyChat />
            )}
          </RightComponent>
        </Component>

        {/*  drawer component  */}
        <div
          className={`${
            openFilterDrawer
              ? "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
              : "hidden"
          }`}
        >
          <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
            Tab Setting
          </h5>

          <button
            type="button"
            onClick={() => setOpenFilterDrawer(false)}
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

          {/* Displaying existing filters */}
          <ul className="mb-4 p-0">
            {filters.map((filter, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-gray-700 mb-2"
              >
                <span>{filter.name}</span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(
                        index,
                        prompt("Enter new filter name:", filter.name)
                      )
                    }
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-red-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="FilterName"
                className="block text-gray-700 font-bold mb-2"
              >
                Filter Name
              </label>
              <input
                type="text"
                id="FilterName"
                name="FilterName"
                value={formData.FilterName}
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Add
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default ChatDialog;
