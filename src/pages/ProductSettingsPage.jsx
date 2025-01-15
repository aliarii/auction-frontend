import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnMdCancel from "../components/Button/BtnMdCancel";
import BtnMdDelete from "../components/Button/BtnMdDelete";
import BtnMdEdit from "../components/Button/BtnMdEdit";
import BtnMdSave from "../components/Button/BtnMdSave";
import ProductCard from "../components/Product/ProductCard";
import {
  createProductCategory,
  deleteProductCategory,
  getProductCategories,
  updateProductCategory,
} from "../store/slices/categorySlice";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../store/slices/productSlice";
import HorizontalLine from "../components/HorizontalLine";

const ProductSettingsPage = () => {
  const views = [
    {
      id: 1,
      element: (props) => (
        <ProductsView
          {...props}
          handleUpdateProductSelect={handleUpdateProductSelect}
          handleAddNewProductSelect={handleAddNewProductSelect}
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
        <AddNewProductView {...props} handleCancel={handleCancel} />
      ),
    },
    {
      id: 5,
      element: (props) => (
        <UpdateProductView {...props} handleCancel={handleCancel} />
      ),
    },
  ];

  const dispatch = useDispatch();
  const { productCategories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [selectedViewId, setSelectedViewId] = useState(0);

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productCategories) {
      const newCategories = [{ name: "All", products }, ...productCategories];
      setCategories(newCategories);

      setSelectedCategory(newCategories[0]);
    }
  }, [dispatch, productCategories, products]);

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

  const handleAddNewProductSelect = () => {
    handleViewSelect(3);
  };

  const handleUpdateProductSelect = (product) => {
    setSelectedView(views[4].element({ product }));
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

export default ProductSettingsPage;

const ProductsView = ({
  name,
  products,
  handleUpdateProductSelect,
  handleAddNewProductSelect,
  handleUpdateCategorySelect,
}) => {
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
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
        onClick={() => handleAddNewProductSelect()}
      >
        + New Product
      </button>
      <Grid2
        container
        spacing={1}
        columns={{ xs: 2, sm: 2, md: 2, lg: 3 }}
        className="overflow-auto"
      >
        {products?.length > 0
          ? products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onView={() => handleUpdateProductSelect(product)}
              />
            ))
          : ""}
      </Grid2>
    </div>
  );
};

const AddNewCategoryView = ({ products, handleCancel }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [notSelectedProducts, setNotSelectedProducts] = useState(products);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCategorySave = () => {
    const reqData = {
      name: categoryName,
      image: "",
      products: selectedProducts,
    };
    dispatch(createProductCategory(reqData))
      .then(() => dispatch(getProductCategories()))
      .then(() => setCategoryName(""))
      .then(() => setNotSelectedProducts([]))
      .then(() => setSelectedProducts([]));
  };

  const handleProductAdd = (product) => {
    setNotSelectedProducts(
      notSelectedProducts.filter((p) => p._id !== product._id),
    );
    setSelectedProducts([...selectedProducts, product]);
  };
  const handleProductRemove = (product) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    setNotSelectedProducts([...notSelectedProducts, product]);
  };
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
        <h2>New Category</h2>
        <div className="absolute bottom-0 right-0">
          <BtnMdCancel clickEvent={() => handleCancel()} />
        </div>
      </div>

      <hr className="w-full border border-green-200" />

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
            <h2>All Products</h2>
            <hr className="w-full border border-green-200" />

            <div className="h-full overflow-auto">
              {notSelectedProducts?.map((product) => (
                <h2
                  key={product._id}
                  className="cursor-pointer rounded pl-1 hover:bg-green-200"
                  onClick={() => handleProductAdd(product)}
                >
                  {product.name}
                </h2>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col justify-center">
            <ArrowRightAltIcon />
            <ArrowRightAltIcon className="rotate-180" />
          </div>

          <div className="flex h-full w-full flex-col gap-1 overflow-auto rounded-lg border-2 p-2 shadow-md">
            <h2>Selected Products</h2>
            <hr className="w-full border border-green-200" />

            <div className="h-full overflow-auto">
              {selectedProducts.length > 0 ? (
                selectedProducts?.map((product) => (
                  <h2
                    key={product.id}
                    className="cursor-pointer rounded pl-1 hover:bg-green-200"
                    onClick={() => handleProductRemove(product)}
                  >
                    {product.name}
                  </h2>
                ))
              ) : (
                <span>No products selected</span>
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
  products: existingProducts,
  handleCancel,
}) => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState(name);
  const [notSelectedProducts, setNotSelectedProducts] = useState(
    products?.filter(
      (pr) =>
        !existingProducts.some(
          (selectedProduct) => selectedProduct._id === pr._id,
        ),
    ) || [],
  );
  const [selectedProducts, setSelectedProducts] = useState(existingProducts);

  const handleCategorySave = () => {
    const reqData = {
      id: _id,
      name: categoryName,
      addedProducts: selectedProducts,
      removedProducts: notSelectedProducts,
      products: selectedProducts,
    };
    dispatch(updateProductCategory(reqData))
      .then(() => dispatch(getProductCategories()))
      .then(() => setCategoryName(""))
      .then(() => setNotSelectedProducts([]))
      .then(() => setSelectedProducts([]));
  };
  const handleCategoryDelete = () => {
    const reqData = {
      id: _id,
    };
    dispatch(deleteProductCategory(reqData)).then(() =>
      dispatch(getProductCategories()),
    );
  };
  const handleProductAdd = (product) => {
    setNotSelectedProducts(
      notSelectedProducts.filter((p) => p._id !== product._id),
    );
    setSelectedProducts([...selectedProducts, product]);
  };
  const handleProductRemove = (product) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    setNotSelectedProducts([...notSelectedProducts, product]);
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
              <h2>All Products</h2>
              <hr className="w-full border border-green-200" />

              <div className="h-full overflow-auto">
                {notSelectedProducts?.map((product) => (
                  <h2
                    key={product._id}
                    className="cursor-pointer rounded pl-1 hover:bg-green-200"
                    onClick={() => handleProductAdd(product)}
                  >
                    {product.name}
                  </h2>
                ))}
              </div>
            </div>

            <div className="flex h-full flex-col justify-center">
              <ArrowRightAltIcon />
              <ArrowRightAltIcon className="rotate-180" />
            </div>

            <div className="flex h-full w-full flex-col gap-1 overflow-auto rounded-lg border-2 p-2 shadow-md">
              <h2>Selected Products</h2>
              <hr className="w-full border border-green-200" />

              <div className="h-full overflow-auto">
                {selectedProducts.length > 0 ? (
                  selectedProducts?.map((product) => (
                    <h2
                      key={product._id}
                      className="cursor-pointer rounded pl-1 hover:bg-green-200"
                      onClick={() => handleProductRemove(product)}
                    >
                      {product.name}
                    </h2>
                  ))
                ) : (
                  <span>No products selected</span>
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

const AddNewProductView = ({ _id, name, handleCancel }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    quantity: 1,
    description: "",
    category: null,
    images: [],
  });
  const handleProductSave = () => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("quantity", productData.quantity);
    formData.append("description", productData.description);
    formData.append("category", name === "All" ? null : _id);

    productData.images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createProduct(formData))
      .then(() => dispatch(getProducts()))
      .then(() =>
        setProductData({
          name: "",
          quantity: 1,
          description: "",
          category: null,
          images: [],
        }),
      );
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length <= 5) {
      setProductData((prevData) => ({
        ...prevData,
        images: Array.from(files),
      }));
    } else {
      alert("Maksimum 5 resim.");
    }
  };
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
        <h2>Add Product</h2>
        <div className="absolute bottom-0 right-0">
          <BtnMdCancel clickEvent={() => handleCancel()} />
        </div>
      </div>

      <hr className="w-full border border-green-200" />

      <div className="flex h-full w-full flex-col overflow-auto">
        <div className="flex w-full flex-col gap-2 overflow-auto px-2 pb-2">
          <div className="flex w-full flex-col gap-2">
            <h2>Product Name:</h2>
            <input
              type="text"
              autoCapitalize="off"
              className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none"
              placeholder="Product Name"
              name="name"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
            <h2>Product Quantity:</h2>
            <input
              type="number"
              autoCapitalize="off"
              className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none"
              placeholder="Product Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={(e) =>
                setProductData({ ...productData, quantity: +e.target.value })
              }
            />
            <textarea
              name="description"
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
              placeholder="Description"
              rows="4"
              className="w-full rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-sm text-gray-500">Max 5 file.</p>
          </div>
          <div className="flex w-full justify-end gap-2">
            <BtnMdSave clickEvent={handleProductSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateProductView = ({ product, handleCancel }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(product);

  const handleProductUpdate = () => {
    const reqData = {
      id: product._id,
      name: productData.name,
      quantity: productData.quantity,
      description: productData.description,
      category: productData.category,
      images: productData.images,
    };
    dispatch(updateProduct(reqData))
      .then(() => dispatch(getProducts()))
      .then(() =>
        setProductData({
          name: "",
          quantity: 1,
          description: "",
          category: null,
          images: [],
        }),
      );
  };
  const handleProductDelete = () => {
    const reqData = {
      id: product._id,
    };
    dispatch(deleteProduct(reqData))
      .then(() => dispatch(getProducts()))
      .then(() =>
        setProductData({
          name: "",
          quantity: 1,
          description: "",
          category: null,
          images: [],
        }),
      );
  };
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
        <h2>Update Product: {product?.name}</h2>
        <div className="absolute bottom-0 right-0">
          <BtnMdCancel clickEvent={() => handleCancel()} />
        </div>
      </div>

      <hr className="w-full border border-green-200" />

      <div className="flex h-full w-full flex-col overflow-auto">
        <div className="flex h-full w-full flex-col gap-2 overflow-auto px-2 pb-2">
          <h2>Product Name:</h2>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none"
            placeholder="Product Name"
            name="name"
            value={productData?.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
          <h2>Product Quantity:</h2>
          <input
            type="number"
            autoCapitalize="off"
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none"
            placeholder="Product Quantity"
            name="quantity"
            value={productData?.quantity}
            onChange={(e) =>
              setProductData({ ...productData, quantity: +e.target.value })
            }
          />
          <textarea
            name="description"
            value={productData?.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            placeholder="Description"
            rows="4"
            className="w-full rounded-md border border-light-10 px-2 py-1 outline-none"
          />
          <div className="flex w-full justify-end gap-2">
            <BtnMdDelete clickEvent={handleProductDelete} />
            <BtnMdSave clickEvent={handleProductUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
};
