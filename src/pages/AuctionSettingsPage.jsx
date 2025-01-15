import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalLine from "../components/HorizontalLine";
import {
  createAuction,
  deleteAuction,
  getAuctions,
  updateAuction,
} from "../store/slices/auctionSlice";
import {
  createAuctionCategory,
  deleteAuctionCategory,
  getAuctionCategories,
  updateAuctionCategory,
} from "../store/slices/categorySlice";

import BtnMdEdit from "../components/Button/BtnMdEdit";
import BtnMdCancel from "../components/Button/BtnMdCancel";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import BtnMdSave from "../components/Button/BtnMdSave";
import BtnMdDelete from "../components/Button/BtnMdDelete";
import AuctionCard from "../components/Auction/AuctionCard";

const AuctionSettingsPage = () => {
  const views = [
    {
      id: 1,
      element: (props) => (
        <AuctionsView
          {...props}
          handleUpdateAuctionSelect={handleUpdateAuctionSelect}
          handleAddNewAuctionSelect={handleAddNewAuctionSelect}
          handleUpdateCategorySelect={handleUpdateCategorySelect}
        />
      ),
    },

    {
      id: 2,
      element: (props) => (
        <AddNewCategoryView {...props} handleCancel={handleCancel} />
      ),
    },

    {
      id: 3,
      element: (props) => (
        <UpdateCategoryView {...props} handleCancel={handleCancel} />
      ),
    },
    {
      id: 4,
      element: (props) => (
        <AddNewAuctionView {...props} handleCancel={handleCancel} />
      ),
    },
    {
      id: 5,
      element: (props) => (
        <UpdateAuctionView {...props} handleCancel={handleCancel} />
      ),
    },
  ];

  const dispatch = useDispatch();
  const { auctionCategories } = useSelector((state) => state.category);
  const { auctions } = useSelector((state) => state.auction);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [selectedViewId, setSelectedViewId] = useState(0);

  useEffect(() => {
    dispatch(getAuctionCategories());
    dispatch(getAuctions());
  }, [dispatch]);

  useEffect(() => {
    if (auctionCategories) {
      const newCategories = [{ name: "All", auctions }, ...auctionCategories];
      setCategories(newCategories);

      setSelectedCategory(newCategories[0]);
    }
  }, [dispatch, auctionCategories, auctions]);

  useEffect(() => {
    if (selectedCategory) {
      handleViewSelect(0);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddNewCategorySelect = () => {
    setSelectedView(views[1].element(categories[0]));
    setSelectedViewId(1);
  };
  const handleUpdateCategorySelect = () => {
    handleViewSelect(2);
  };

  const handleAddNewAuctionSelect = () => {
    handleViewSelect(3);
  };

  const handleUpdateAuctionSelect = (auction) => {
    setSelectedView(views[4].element({ auction }));
    setSelectedViewId(4);
  };

  const handleCancel = () => {
    handleViewSelect(0);
  };
  const handleViewSelect = (index) => {
    setSelectedView(views[index].element(selectedCategory));
    setSelectedViewId(index);
  };
  return (
    <div className="flex h-full w-full flex-col gap-1 overflow-auto md:flex-row">
      <div className="flex min-h-fit w-full flex-col gap-2 overflow-auto p-2 md:h-full md:w-[calc(20%)]">
        <h1>Categories</h1>
        <hr className="w-full border border-green-200" />

        <div className="flex h-fit w-full flex-col gap-2 overflow-auto">
          <button
            className={`overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-green-500 py-1 text-white`}
            onClick={() => handleAddNewCategorySelect()}
          >
            + New Category
          </button>

          <div className="flex gap-1 overflow-auto md:flex-col">
            {categories?.map((category, index) => (
              <div
                className={`flex cursor-pointer items-center justify-between rounded-md py-1 hover:bg-green-200 ${selectedViewId !== 1 && category.name === selectedCategory.name ? "bg-green-200" : ""}`}
                key={index}
                onClick={() => handleCategorySelect(category)}
              >
                <span className="ml-2 mr-2 whitespace-nowrap md:mr-0">
                  {category.name}
                </span>
                {category === selectedCategory && (
                  <div className="hidden justify-center md:inline-flex">
                    <ChevronRightIcon />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden h-full w-0.5 bg-green-200 sm:flex" />
      <div className="block rounded-full bg-green-400 py-0.5 sm:hidden" />

      <div className="h-full w-full overflow-auto md:w-[calc(80%)]">
        {selectedView}
      </div>
    </div>
  );
};

export default AuctionSettingsPage;

const AuctionsView = ({
  name,
  auctions,
  handleUpdateAuctionSelect,
  handleAddNewAuctionSelect,
  handleUpdateCategorySelect,
}) => {
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="flex min-h-6 w-full items-end justify-between">
        <h1>{name}</h1>
        {name !== "All" ? (
          <div className="absolute bottom-0 right-0">
            <BtnMdEdit handleClick={() => handleUpdateCategorySelect()} />
          </div>
        ) : (
          ""
        )}
      </div>

      <hr className="w-full border border-green-200" />

      <button
        className={`rounded-md bg-green-500 py-1 text-white`}
        onClick={() => handleAddNewAuctionSelect()}
      >
        + New Auction
      </button>
      <Grid2
        container
        spacing={1}
        columns={{ xs: 2, sm: 2, md: 2, lg: 3 }}
        className="overflow-auto"
      >
        {auctions?.length > 0
          ? auctions.map((auction, index) => (
              <AuctionCard
                key={index}
                auction={auction}
                onView={() => handleUpdateAuctionSelect(auction)}
              />
            ))
          : ""}
      </Grid2>
    </div>
  );
};

const AddNewCategoryView = ({ auctions, handleCancel }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [notSelectedAuctions, setNotSelectedAuctions] = useState(auctions);
  const [selectedAuctions, setSelectedAuctions] = useState([]);

  const handleCategorySave = () => {
    const reqData = {
      name: categoryName,
      image: "",
      auctions: selectedAuctions,
    };

    dispatch(createAuctionCategory(reqData))
      .then(() => dispatch(getAuctionCategories()))
      .then(() => setCategoryName(""))
      .then(() => setNotSelectedAuctions([]))
      .then(() => setSelectedAuctions([]));
  };

  const handleAuctionAdd = (auction) => {
    setNotSelectedAuctions(
      notSelectedAuctions.filter((p) => p._id !== auction._id),
    );
    setSelectedAuctions([...selectedAuctions, auction]);
  };
  const handleAuctionRemove = (auction) => {
    setSelectedAuctions(selectedAuctions.filter((p) => p._id !== auction._id));
    setNotSelectedAuctions([...notSelectedAuctions, auction]);
  };
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
        <h2>New Category</h2>
        <div className="absolute right-0">
          <BtnMdCancel clickEvent={() => handleCancel()} />
        </div>
      </div>

      <HorizontalLine />

      <div className="flex h-full w-full flex-col gap-2 overflow-auto">
        <div className="flex w-full flex-col gap-2 px-2 pb-2">
          <h2>Category Name:</h2>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none"
            placeholder="Category Name"
            name="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex h-full w-full gap-1 overflow-auto">
          <div className="flex h-full w-full flex-col gap-1 overflow-auto rounded-lg border-2 p-2 shadow-md">
            <h2>All </h2>
            <hr className="w-full border border-green-200" />

            <div className="h-full overflow-auto">
              {notSelectedAuctions?.map((auction) => (
                <h2
                  key={auction._id}
                  className="cursor-pointer rounded pl-1 hover:bg-green-200"
                  onClick={() => handleAuctionAdd(auction)}
                >
                  {auction.name}
                </h2>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col justify-center">
            <ArrowRightAltIcon />
            <ArrowRightAltIcon className="rotate-180" />
          </div>

          <div className="flex h-full w-full flex-col gap-1 overflow-auto rounded-lg border-2 p-2 shadow-md">
            <h2>Selected</h2>
            <hr className="w-full border border-green-200" />

            <div className="h-full overflow-auto">
              {selectedAuctions.length > 0 ? (
                selectedAuctions?.map((auction) => (
                  <h2
                    key={auction._id}
                    className="cursor-pointer rounded pl-1 hover:bg-green-200"
                    onClick={() => handleAuctionRemove(auction)}
                  >
                    {auction.name}
                  </h2>
                ))
              ) : (
                <span>No selected</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end gap-2">
          <BtnMdSave clickEvent={handleCategorySave} />
        </div>
      </div>
    </div>
  );
};

const UpdateCategoryView = ({
  _id,
  name,
  auctions: existingAuctions,
  handleCancel,
}) => {
  const { auctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState(name);
  const [notSelectedAuctions, setNotSelectedAuctions] = useState(
    auctions?.filter(
      (pr) =>
        !existingAuctions.some(
          (selectedAuction) => selectedAuction._id === pr._id,
        ),
    ) || [],
  );
  const [selectedAuctions, setSelectedAuctions] = useState(existingAuctions);

  const handleCategorySave = () => {
    const reqData = {
      id: _id,
      name: categoryName,
      addedAuctions: selectedAuctions,
      removedAuctions: notSelectedAuctions,
      auctions: selectedAuctions,
    };
    dispatch(updateAuctionCategory(reqData))
      .then(() => dispatch(getAuctionCategories()))
      .then(() => setCategoryName(""))
      .then(() => setNotSelectedAuctions([]))
      .then(() => setSelectedAuctions([]));
  };
  const handleCategoryDelete = () => {
    const reqData = {
      id: _id,
    };
    dispatch(deleteAuctionCategory(reqData)).then(() =>
      dispatch(getAuctionCategories()),
    );
  };
  const handleAuctionAdd = (auction) => {
    setNotSelectedAuctions(
      notSelectedAuctions.filter((p) => p._id !== auction._id),
    );
    setSelectedAuctions([...selectedAuctions, auction]);
  };
  const handleAuctionRemove = (auction) => {
    setSelectedAuctions(selectedAuctions.filter((p) => p._id !== auction._id));
    setNotSelectedAuctions([...notSelectedAuctions, auction]);
  };
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
        <h2>Update Category: {name}</h2>
        <div className="absolute bottom-0 right-0">
          <BtnMdCancel clickEvent={() => handleCancel()} />
        </div>
      </div>

      <hr className="w-full border border-green-200" />

      <div className="flex h-full w-full flex-col overflow-auto">
        <div className="flex h-full w-full flex-col gap-2 overflow-auto">
          <div className="flex w-full flex-col gap-2 px-2 pb-2">
            <h2>Category Name:</h2>
            <input
              type="text"
              autoCapitalize="off"
              className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none"
              placeholder="Category Name"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="flex h-full w-full gap-1 overflow-auto">
            <div className="flex h-full w-full flex-col gap-1 overflow-auto rounded-lg border-2 p-2 shadow-md">
              <h2>All</h2>
              <hr className="w-full border border-green-200" />

              <div className="h-full overflow-auto">
                {notSelectedAuctions?.map((auction) => (
                  <h2
                    key={auction._id}
                    className="cursor-pointer rounded pl-1 hover:bg-green-200"
                    onClick={() => handleAuctionAdd(auction)}
                  >
                    {auction.name}
                  </h2>
                ))}
              </div>
            </div>

            <div className="flex h-full flex-col justify-center">
              <ArrowRightAltIcon />
              <ArrowRightAltIcon className="rotate-180" />
            </div>

            <div className="flex h-full w-full flex-col gap-1 overflow-auto rounded-lg border-2 p-2 shadow-md">
              <h2>Selected</h2>
              <hr className="w-full border border-green-200" />

              <div className="h-full overflow-auto">
                {selectedAuctions.length > 0 ? (
                  selectedAuctions?.map((auction) => (
                    <h2
                      key={auction._id}
                      className="cursor-pointer rounded pl-1 hover:bg-green-200"
                      onClick={() => handleAuctionRemove(auction)}
                    >
                      {auction.name}
                    </h2>
                  ))
                ) : (
                  <span>No selected</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-2">
            <BtnMdDelete clickEvent={handleCategoryDelete} />
            <BtnMdSave clickEvent={handleCategorySave} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AddNewAuctionView = ({ _id, name, handleCancel }) => {
  const { products } = useSelector((state) => state.product);
  const { auctionCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [auctionData, setAuctionData] = useState({
    name: "",
    description: "",
    product: "",
    category: name === "All" ? null : _id,
    condition: "New",
    status: "Active",
    startingPrice: 0,
    auctionStartTime: "",
    auctionEndTime: "",
  });
  const handleAuctionSave = () => {
    dispatch(createAuction(auctionData))
      .then(() => dispatch(getAuctions()))
      .then(() => dispatch(getAuctionCategories()))
      .then(() =>
        setAuctionData({
          name: "",
          description: "",
          product: "",
          category: null,
          condition: "New",
          status: "Active",
          startingPrice: 0,
          auctionStartTime: "",
          auctionEndTime: "",
        }),
      );
  };
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
        <h2>Add</h2>
        <div className="absolute bottom-0 right-0">
          <BtnMdCancel clickEvent={() => handleCancel()} />
        </div>
      </div>

      <hr className="w-full border border-green-200" />

      <div className="flex h-full w-full flex-col overflow-auto">
        <div className="flex w-full flex-col gap-2 overflow-auto px-2 pb-2">
          <div className="flex w-full flex-col gap-1">
            <input
              type="text"
              name="name"
              autoCapitalize="off"
              value={auctionData.name}
              onChange={(e) =>
                setAuctionData({ ...auctionData, name: e.target.value })
              }
              placeholder="Title"
              className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none"
            />
            <textarea
              name="description"
              value={auctionData.description}
              onChange={(e) =>
                setAuctionData({ ...auctionData, description: e.target.value })
              }
              placeholder="Description"
              rows="4"
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="product"
              value={auctionData.product || ""}
              onChange={(e) =>
                setAuctionData({ ...auctionData, product: e.target.value })
              }
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Product</option>
              {products &&
                products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
            </select>
            <select
              name="category"
              value={auctionData.category || ""}
              onChange={(e) =>
                setAuctionData({ ...auctionData, category: e.target.value })
              }
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              {auctionCategories &&
                auctionCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <h2>Product Condition:</h2>
            <select
              name="condition"
              value={auctionData.condition}
              onChange={(e) =>
                setAuctionData({ ...auctionData, condition: e.target.value })
              }
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
            <h2>Auction Status:</h2>
            <select
              name="status"
              value={auctionData.status}
              onChange={(e) =>
                setAuctionData({ ...auctionData, status: e.target.value })
              }
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
            <h2>Starting Price:</h2>
            <input
              type="number"
              name="startingPrice"
              value={auctionData.startingPrice}
              onChange={(e) =>
                setAuctionData({
                  ...auctionData,
                  startingPrice: +e.target.value,
                })
              }
              placeholder="Starting Price"
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <h2>Start Date:</h2>
            <input
              type="datetime-local"
              name="auctionStartTime"
              value={auctionData.auctionStartTime}
              onChange={(e) =>
                setAuctionData({
                  ...auctionData,
                  auctionStartTime: e.target.value,
                })
              }
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <h2>End Date:</h2>
            <input
              type="datetime-local"
              name="auctionEndTime"
              value={auctionData.auctionEndTime}
              onChange={(e) =>
                setAuctionData({
                  ...auctionData,
                  auctionEndTime: e.target.value,
                })
              }
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex w-full justify-end gap-2">
            <BtnMdSave clickEvent={handleAuctionSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateAuctionView = ({ auction, handleCancel }) => {
  const { products } = useSelector((state) => state.product);
  const { auctionCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [auctionData, setAuctionData] = useState({ ...auction });

  const handleAuctionUpdate = () => {
    const reqData = {
      ...auctionData,
      id: auction._id,
      category: auctionData.category === "" ? null : auctionData.category,
    };

    dispatch(updateAuction(reqData))
      .then(() => dispatch(getAuctions()))
      .then(() => dispatch(getAuctionCategories()))
      .then(() =>
        setAuctionData({
          name: "",
          description: "",
          product: "",
          category: null,
          condition: "New",
          status: "Active",
          startingPrice: 0,
          auctionStartTime: "",
          auctionEndTime: "",
        }),
      );
  };
  const handleAuctionDelete = () => {
    const reqData = {
      id: auction._id,
    };
    dispatch(deleteAuction(reqData))
      .then(() => dispatch(getAuctions()))
      .then(() => dispatch(getAuctionCategories()))
      .then(() =>
        setAuctionData({
          name: "",
          description: "",
          product: "",
          category: null,
          condition: "New",
          status: "Active",
          startingPrice: 0,
          auctionStartTime: "",
          auctionEndTime: "",
        }),
      );
  };

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
        <h2>Update Auction: {auction?.name}</h2>
        <div className="absolute bottom-0 right-0">
          <BtnMdCancel clickEvent={() => handleCancel()} />
        </div>
      </div>

      <hr className="w-full border border-green-200" />

      <div className="flex h-full w-full flex-col overflow-auto">
        <div className="flex h-full w-full flex-col gap-2 overflow-auto px-2 pb-2">
          <input
            type="text"
            name="name"
            autoCapitalize="off"
            value={auctionData.name}
            onChange={(e) =>
              setAuctionData({ ...auctionData, name: e.target.value })
            }
            placeholder="Title"
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none"
          />
          <textarea
            name="description"
            value={auctionData.description}
            onChange={(e) =>
              setAuctionData({ ...auctionData, description: e.target.value })
            }
            placeholder="Description"
            rows="4"
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            name="product"
            value={auctionData.product || ""}
            onChange={(e) =>
              setAuctionData({ ...auctionData, product: e.target.value })
            }
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Product</option>
            {products &&
              products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
          </select>
          <select
            name="category"
            value={auctionData.category || ""}
            onChange={(e) =>
              setAuctionData({ ...auctionData, category: e.target.value })
            }
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            {auctionCategories &&
              auctionCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <h2>Product Condition:</h2>
          <select
            name="condition"
            value={auctionData.condition}
            onChange={(e) =>
              setAuctionData({ ...auctionData, condition: e.target.value })
            }
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <h2>Auction Status:</h2>
          <select
            name="status"
            value={auctionData.status}
            onChange={(e) =>
              setAuctionData({ ...auctionData, status: e.target.value })
            }
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
          <h2>Starting Price:</h2>
          <input
            type="number"
            name="startingPrice"
            value={auctionData.startingPrice}
            onChange={(e) =>
              setAuctionData({
                ...auctionData,
                startingPrice: +e.target.value,
              })
            }
            placeholder="Starting Price"
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <h2>Start Date:</h2>
          <input
            type="datetime-local"
            name="auctionStartTime"
            value={auctionData.auctionStartTime}
            onChange={(e) =>
              setAuctionData({
                ...auctionData,
                auctionStartTime: e.target.value,
              })
            }
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <h2>End Date:</h2>
          <input
            type="datetime-local"
            name="auctionEndTime"
            value={auctionData.auctionEndTime}
            onChange={(e) =>
              setAuctionData({
                ...auctionData,
                auctionEndTime: e.target.value,
              })
            }
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex w-full justify-end gap-2">
            <BtnMdDelete clickEvent={handleAuctionDelete} />
            <BtnMdSave clickEvent={handleAuctionUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
};
