import '../css/orderSummary.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function OrderSummary({ totalPrice, myPoint, setModal }) {
  const user = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);
  const [point, setPoint] = useState(0);
  const [remain, setRemain] = useState(0);
  // const [minus, setRemain] = useState(0);
  useEffect(() => {
    setTotal(totalPrice);
    setPoint(myPoint);
    setRemain(myPoint - totalPrice - 3000);
  }, [totalPrice, myPoint]);

  const payment = () => {
    if (user.userRole === '') {
      window.alert('로그인이 필요한 서비스입니다');
      return;
    }
    if (user.userRole === 'ROLE_ADMIN_TEST' || user.userRole === 'ROLE_ADMIN') {
      window.alert('판매자는 이용할 수 없습니다.');
      return;
    }
    if (total === 0) {
      window.alert('선택한 상품이 없습니다.');
      return;
    }
    if (myPoint < totalPrice + 3000) {
      window.alert('포인트가 부족합니다');
      return;
    }
    setModal(true);
  };

  return (
    <>
      <div className="orderSummaryContainer">
        <div className="orderSticky">
          <div className="orderSummaryBox">
            <h1>Order Summary</h1>
          </div>

          {/* 결제 정보 */}
          <div className="orderInfoContainer">
            <div className="orderTextAlign">결제</div>
            <div className="productPriceBox">
              <div>제품 금액</div>
              <div>{total}원</div>
            </div>
            <div className="deliveryFeeBox">
              <div>배송비</div>
              <div>3000원</div>
            </div>
          </div>

          {/* 총 금액 정보 */}
          <div>
            <div className="totalPointBox">
              <div>사용 가능 포인트</div>
              {user.userRole !== '' ? (
                <>
                  <div>{point}원</div>
                </>
              ) : (
                <>
                  <div>-</div>
                </>
              )}
            </div>
            <div className="totalPriceBox">
              <div>결제 금액</div>
              <div>{total + 3000}원</div>
            </div>
            <div className="remainPoint">
              <div>잔여 포인트</div>
              {user.userRole !== '' ? (
                <>
                  <div>{remain}원</div>
                </>
              ) : (
                <>
                  <div>-</div>
                </>
              )}
            </div>
          </div>

          {/* order버튼 -> 결제창 띄우가 */}
          <div className="orderBtnBox">
            <button onClick={payment}>포인트 결제</button>
          </div>
        </div>
      </div>
    </>
  );
}
