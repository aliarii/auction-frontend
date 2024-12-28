import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Auctions from "../pages/admin/Auctions";
import Categories from "../pages/admin/Categories";
import Users from "../pages/admin/Users";
import AddProduct from "../pages/admin/AddProduct";
import AddCategory from "../pages/admin/AddCategory";
import AddAuction from "../pages/admin/AddAuction";
function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/admin/auctions" element={<Auctions />} />
            <Route path="/admin/auctions/add" element={<AddAuction />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/categories/add" element={<AddCategory />} />
            <Route path="/admin/users" element={<Users />} />
        </Routes>
    );
}

export default AdminRoutes;