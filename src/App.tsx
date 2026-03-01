import { Routes, Route } from 'react-router';

//IMPORTING PAGES
import Home from './pages/Home';
import AccessoriesAndParts from './pages/Accessories_And_Parts';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import CartPage from './pages/Cart';
import AllProducts from './pages/All_Products';
import KitchenAppliances from './pages/Kitchen-Appliances';
import Kitchenware from './pages/Kitchenware';
import BlendersAndJuicers from './pages/Blenders-And-Juicers';
import BundleAndSave from './pages/Bundle-And-Save';
import ProductPage from './pages/Product';
import PurchaseChatPage from './pages/Admin_Chat_List';
import AdminPage from './pages/Admin-Page';
import PaymentOptionsPage from './pages/Payment-Options';
import ChatPage from './pages/Customer-Care-Chat';
import UserChatList from './pages/Purchases-List';
import SignUpPage from './pages/Register';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/accessories-and-parts"
          element={<AccessoriesAndParts />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/kitchen-appliances" element={<KitchenAppliances />} />
        <Route path="/blenders-and-juicers" element={<BlendersAndJuicers />} />
        <Route path="/kitchenware" element={<Kitchenware />} />
        <Route path="/bundle-and-save" element={<BundleAndSave />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/purchases-list" element={<UserChatList />} />
        <Route path="/payment-options" element={<PaymentOptionsPage />} />
        <Route path="/customer-care-chat/:chatId" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/chats" element={<PurchaseChatPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;
