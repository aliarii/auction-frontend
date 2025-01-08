import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnMdCancel from "../components/Button/BtnMdCancel";
import BtnMdDelete from "../components/Button/BtnMdDelete";
import BtnMdEdit from "../components/Button/BtnMdEdit";
import BtnMdSave from "../components/Button/BtnMdSave";
import HorizontalLine from "../components/HorizontalLine";
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
      const newCategories = [{ name: "Tümü", products }, ...productCategories];
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
    <div className="flex flex-col md:flex-row w-full h-full gap-1 overflow-auto">
      <div className="flex flex-col w-full md:w-[calc(20%)] min-h-fit md:h-full p-2 gap-2 bg-light-4 rounded-lg overflow-auto">
        <div className="hidden md:flex justify-between items-end w-full min-h-6">
          <h2 className="font-semibold">Kategoriler</h2>
        </div>

        <HorizontalLine />

        <div className="flex flex-col w-full h-fit gap-2 overflow-auto">
          <h2
            className={`text-center rounded-md cursor-pointer text-light-1 bg-success whitespace-nowrap overflow-hidden text-ellipsis`}
            onClick={() => handleAddNewCategorySelect()}
          >
            + Kategori Ekle
          </h2>

          <div className="flex md:flex-col gap-1 overflow-auto">
            {categories?.map((category, index) => (
              <div
                className={`flex justify-between items-center rounded-md cursor-pointer hover:bg-light-8 ${selectedViewId !== 1 && category.name === selectedCategory.name ? "bg-light-8 " : ""}`}
                key={index}
                onClick={() => handleCategorySelect(category)}
              >
                <h2 className="mr-2 md:mr-0 ml-2 whitespace-nowrap">
                  {category.name}
                </h2>
                {category === selectedCategory && (
                  <div className="hidden md:inline-flex justify-center">
                    <ChevronRightIcon />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-[calc(80%)] h-full overflow-auto">
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
    <div className="flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-4 overflow-auto">
      <div className="flex justify-between items-end w-full min-h-6">
        <h2 className="font-semibold">{name}</h2>
        {name !== "Tümü" ? (
          <BtnMdEdit handleClick={() => handleUpdateCategorySelect()} />
        ) : (
          ""
        )}
      </div>

      <HorizontalLine />
      <h2
        className={`text-center rounded-md cursor-pointer text-light-1 bg-success whitespace-nowrap overflow-hidden text-ellipsis`}
        onClick={() => handleAddNewProductSelect()}
      >
        + Ürün Ekle
      </h2>
      <Grid2
        container
        spacing={1}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
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
      notSelectedProducts.filter((p) => p._id !== product._id)
    );
    setSelectedProducts([...selectedProducts, product]);
  };
  const handleProductRemove = (product) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    setNotSelectedProducts([...notSelectedProducts, product]);
  };
  return (
    <div className="flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-4 overflow-auto">
      <div className="flex justify-between items-end w-full min-h-6">
        <h2 className="font-semibold">Kategori Ekle</h2>
        <BtnMdCancel clickEvent={() => handleCancel()} />
      </div>

      <HorizontalLine />

      <div className="flex flex-col w-full h-full gap-2 overflow-auto">
        <div className="flex flex-col w-full gap-2 px-2 pb-2">
          <h2>Kategori Adı:</h2>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
            placeholder="Kategori Adı"
            name="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex w-full h-full gap-1 overflow-auto">
          <div className="flex flex-col w-full h-full p-2 rounded-lg bg-light-4 overflow-auto">
            <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">
              Tüm Ürünler
            </h2>
            <div className="my-1 py-0.5 rounded-full bg-light-7 text-dark-1 " />
            <div className="bg-light-2 p-1 h-full rounded overflow-auto">
              {notSelectedProducts?.map((product) => (
                <h2
                  key={product._id}
                  className="cursor-pointer rounded pl-1 hover:bg-light-5 "
                  onClick={() => handleProductAdd(product)}
                >
                  {product.name}
                </h2>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-full justify-center">
            <ArrowRightAltIcon />
            <ArrowRightAltIcon className="rotate-180" />
          </div>

          <div className="flex flex-col w-full p-2 rounded-lg bg-light-4  overflow-auto">
            <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">
              Seçilen Ürünler
            </h2>
            <div className="my-1 py-0.5 rounded-full bg-light-7 text-dark-1 " />
            <div className="bg-light-2 p-1 h-full rounded overflow-auto">
              {selectedProducts?.map((product) => (
                <h2
                  key={product.id}
                  className="cursor-pointer rounded pl-1 hover:bg-light-5 "
                  onClick={() => handleProductRemove(product)}
                >
                  {product.name}
                </h2>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full gap-2">
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
          (selectedProduct) => selectedProduct._id === pr._id
        )
    ) || []
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
      dispatch(getProductCategories())
    );
  };
  const handleProductAdd = (product) => {
    setNotSelectedProducts(
      notSelectedProducts.filter((p) => p._id !== product._id)
    );
    setSelectedProducts([...selectedProducts, product]);
  };
  const handleProductRemove = (product) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    setNotSelectedProducts([...notSelectedProducts, product]);
  };
  return (
    <div className="flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-4 overflow-auto">
      <div className="flex justify-between items-end w-full min-h-6">
        <h2 className="font-semibold">Kategori Güncelle: {name}</h2>
        <BtnMdCancel clickEvent={() => handleCancel()} />
      </div>

      <HorizontalLine />

      <div className="flex flex-col w-full h-full overflow-auto">
        <div className="flex flex-col w-full h-full gap-2 overflow-auto">
          <div className="flex flex-col w-full gap-2 px-2 pb-2">
            <h2>Kategori Adı:</h2>
            <input
              type="text"
              autoCapitalize="off"
              className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
              placeholder="Kategori Adı"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="flex w-full h-full gap-1 overflow-auto">
            <div className="flex flex-col w-full h-full p-2 rounded-lg bg-light-4  overflow-auto">
              <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">
                Tüm Ürünler
              </h2>
              <div className="my-1 py-0.5 rounded-full bg-light-7  text-dark-1 " />
              <div className="bg-light-2 p-1 h-full rounded overflow-auto">
                {notSelectedProducts?.map((product) => (
                  <h2
                    key={product._id}
                    className="cursor-pointer rounded pl-1 hover:bg-light-5 "
                    onClick={() => handleProductAdd(product)}
                  >
                    {product.name}
                  </h2>
                ))}
              </div>
            </div>

            <div className="flex flex-col h-full justify-center">
              <ArrowRightAltIcon />
              <ArrowRightAltIcon className="rotate-180" />
            </div>

            <div className="flex flex-col w-full p-2 rounded-lg bg-light-4  overflow-auto">
              <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">
                Seçilen Ürünler
              </h2>
              <div className="my-1 py-0.5 rounded-full bg-light-7  text-dark-1 " />
              <div className="bg-light-2  p-1 h-full rounded overflow-auto">
                {selectedProducts?.map((product) => (
                  <h2
                    key={product._id}
                    className="cursor-pointer rounded pl-1 hover:bg-light-5 "
                    onClick={() => handleProductRemove(product)}
                  >
                    {product.name}
                  </h2>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full gap-2">
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
    formData.append("category", name === "Tümü" ? null : _id);

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
        })
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
    <div className="flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-4 overflow-auto">
      <div className="flex justify-between items-end w-full min-h-6">
        <h2 className="font-semibold">Ürün Ekle</h2>
        <BtnMdCancel clickEvent={() => handleCancel()} />
      </div>

      <HorizontalLine />

      <div className="flex flex-col w-full h-full overflow-auto">
        <div className="flex flex-col w-full gap-2 px-2 pb-2 overflow-auto">
          <div className="flex flex-col w-full gap-2 ">
            <h2>Ürün Adı:</h2>
            <input
              type="text"
              autoCapitalize="off"
              className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
              placeholder="Ürün Adı"
              name="name"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
            <h2>Ürün Adedi:</h2>
            <input
              type="number"
              autoCapitalize="off"
              className="w-full py-1 px-2 border border-light-10 outline-none bg-white rounded-lg dark:text-dark-8"
              placeholder="Ürün Adedi"
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
              placeholder="Açıklama"
              rows="4"
              className="w-full py-1 px-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-sm text-gray-500">Maksimum 5 resim.</p>
          </div>
          <div className="flex justify-end w-full gap-2">
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
        })
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
        })
      );
  };
  return (
    <div className="flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-4 overflow-auto">
      <div className="flex justify-between items-end w-full min-h-6">
        <h2 className="font-semibold">Güncelle: {product?.name}</h2>
        <BtnMdCancel clickEvent={() => handleCancel()} />
      </div>

      <HorizontalLine />

      <div className="flex flex-col w-full h-full overflow-auto">
        <div className="flex flex-col w-full h-full gap-2 px-2 pb-2 overflow-auto">
          <h2>Ürün Adı:</h2>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
            placeholder="Ürün Adı"
            name="name"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
          <h2>Ürün Adedi:</h2>
          <input
            type="number"
            autoCapitalize="off"
            className="w-full py-1 px-2 border border-light-10 outline-none bg-white rounded-lg dark:text-dark-8"
            placeholder="Ürün Adedi"
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
            placeholder="Açıklama"
            rows="4"
            className="w-full py-1 px-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end w-full gap-2">
            <BtnMdDelete clickEvent={handleProductDelete} />
            <BtnMdSave clickEvent={handleProductUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
};
