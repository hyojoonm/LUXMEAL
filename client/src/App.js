import { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/js/Layout';
import Home from './pages/home/js/Home';
import Login from './pages/login/js/Login';
import Signup from './pages/signup/js/Signup';
import OauthKakao from './pages/oauth/OauthKakao';
import OauthGoogle from './pages/oauth/OauthGoogle';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './redux/reducers/loginSlice';
import { setUser } from './redux/reducers/userSlice';
import ShopProductList from './pages/shopProductList/js/ShopProductList';
import ShopProductDetail from './pages/shopProductDetail/js/ShopProductDetail';
import ShopProductOrder from './pages/shopProductOrder/js/ShopProductOrder';
// import { tokenReissue } from './util/api/Reissue';
import Seller from './pages/seller/js/Seller';
import SellerLayout from './components/layout/js/SellerLayout';
import ShopLayout from './components/layout/js/ShopLayout';
import Success from './pages/payment/js/Success';
import Failed from './pages/payment/js/Failed';
import SellerProducts from './pages/sellerProduct/js/SellerProducts';
import SellerAddProduct from './pages/sellerAddProduct/js/SellerAddProduct';
import SellerEditProduct from './pages/sellerEditProduct/js/SellerEditProduct';

function App() {
  //json-server 주소
  //json-server --watch data.json --port 3001
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loginData = useSelector((state) => state.login);

  console.log(user);
  console.log(loginData);

  useEffect(() => {
    const userData = JSON.parse(window.sessionStorage.getItem('userData'));
    const accessToken = JSON.parse(window.sessionStorage.getItem('jwtToken'));
    // 스토리지에서 받아온 데이터가 null 이 아니면 리덕스에 데이터 저장.
    if (userData && accessToken) {
      console.log('리덕스에 저장');
      dispatch(setUser(userData));
      dispatch(login({ accessToken }));
    } else {
      // 스토리지에서 받아온 데이터가 null 이면 재발급 요청
      // console.log('재발급 요청');
      // tokenReissue();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth/kakao" element={<OauthKakao />} />
          <Route path="/oauth/google" element={<OauthGoogle />} />
          <Route path="/payment/success" element={<Success />} />
          <Route path="/payment/failed" element={<Failed />} />

          <Route path="/" element={<ShopLayout />}>
            <Route path="/products" element={<ShopProductList />} />
            <Route path="/product/detail" element={<ShopProductDetail />} />
            <Route path="/product/order" element={<ShopProductOrder />} />
          </Route>

          <Route path="/" element={<SellerLayout />}>
            <Route path="/seller" element={<Seller />} />
            <Route path="/seller/product" element={<SellerProducts />} />
            <Route path="/seller/add" element={<SellerAddProduct />} />
            <Route path="/seller/edit" element={<SellerEditProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
