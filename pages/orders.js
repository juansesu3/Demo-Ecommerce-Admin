import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setIsloading(false);
    });
  }, []);

  return (
    <Layout>
      <div className="flex justify-between">
        <h1>Orders</h1>
       
        <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="z-[-10] w-8 h-8 rotate-90  animate-spin"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
      </div>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4}>
                <div className="py-4">
                  <Spinner />
                </div>
              </td>
            </tr>
          )}
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "YES" : "NO"}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode}
                  <br />
                  {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data.product_data?.name} x {l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default OrdersPage;
