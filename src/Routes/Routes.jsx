import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import { Shop } from "../pages/Shop/Shop";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import Contact from "../pages/Contact/Contact";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageOrders from "../pages/Dashboard/ManageOrders/ManageOrders";
import ManageProducts from "../pages/Dashboard/ManageProducts/ManageProducts";
import WishList from "../pages/Dashboard/WishList/WishList";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AdminRoute from "./AdminRoute";
import UpdateProductItem from "../pages/Dashboard/UpdateProductItem/UpdateProductItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Error from "../pages/Error/Error";
import Profile from "../pages/Dashboard/Profile/Profile";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import AllNewProducts from "../pages/AllNewProducts/AllNewProducts";
import AllTrendingProducts from "../pages/AllTrendingProducts/AllTrendingProducts";
import AllBestSellerProducts from "../pages/AllBestSellerProducts/AllBestSellerProducts";
import AllFridayOfferProducts from "../pages/AllFridayOfferProducts/AllFridayOfferProducts";
import AllFeaturedProducts from "../pages/AllFeaturedProducts/AllFeaturedProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import CategoryProduct from "../pages/CategoryProduct/CategoryProduct";
import SearchResults from "../pages/SearchResults/SearchResults";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/all-new-products",
        element: <AllNewProducts />,
      },
      {
        path: "/all-trending-products",
        element: <AllTrendingProducts />,
      },
      {
        path: "/all-bestSeller-products",
        element: <AllBestSellerProducts />,
      },
      {
        path: "/all-fridayOffer-products",
        element: <AllFridayOfferProducts />,
      },
      {
        path: "/all-featured-products",
        element: <AllFeaturedProducts />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products/category/:category",
        element: <CategoryProduct />,
      },
      {
        path: "/search",
        element: <SearchResults/>
      }
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // user routes
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "wishlist",
        element: <WishList />,
      },
      {
        path: "add-review",
        element: <AddReview />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      // admin routes
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <AdminRoute>
            <ManageProducts />
          </AdminRoute>
        ),
      },
      {
        path: "update-item/:id",
        element: (
          <AdminRoute>
            <UpdateProductItem />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://techzy-server.vercel.app/products/${params.id}`),
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
