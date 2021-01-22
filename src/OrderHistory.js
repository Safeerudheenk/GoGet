import React, { useEffect } from 'react';
import './OrderHistory.css';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from './actions/orderActions';
import Header from './Header';

function OrderHistory(props) {
    const orderList = useSelector (state => state. orderList);
    const {loading, error, orders} = orderList;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    console.log(userInfo);
        const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrders(userInfo._id));
    }, [dispatch, userInfo])
    return loading ? <div>loading</div>:
    error ? <div>{error}</div> : (
        <div>
            <Header/>
            <h1>Order History</h1>
            <table className="table" >
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>TOTAL</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr  >
                            <td>{order._id}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.subString(0, 10):'Not Paid'}</td>
                            <td>{order.isDelivered ? order.deliveredAt.subString(0, 10):'Delivered'}</td>
                            <td>
                                <button type="button"
                                onClick={() => {props.history.push(`/order/${order._id}`)} }
                                  >
                                      Details
                                </button>
                             </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
