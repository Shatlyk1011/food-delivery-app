import axios from "../../../app/shared/lib/axios";
import React, { useEffect, useState } from "react";

import { USER_ORDERS } from "../../../app/services/query/orderQuery";

import payload from "payload";

const OrderRefetchComponent = () => {
  const [orders, setOrders] = useState([]);

  // STUCK
  // payload.find({
  //   collection: "orders",
  //   where: {
  //     orderedByUser: { equals: req.user.id },
  //     createdAt: { greater_than: thirtyMinutesAgo },
  //   },
  //   limit: 0,
  //   depth: 0,
  // });

  const fetchOrders = async () => {
    const { data } = await axios("http://localhost:3000/api/orders", {
      withCredentials: true,
      data: {
        query: USER_ORDERS,
        variables: { userId: "123", limit: 20, page: 1 },
      },
    });
    console.log("orders", data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Refetching orders...");
      fetchOrders();
    }, 5000);
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [fetchOrders]);

  // useEffect(() => {
  //   if (data) {
  //     setOrders(data);
  //   }
  // }, [data]);

  return (
    <div>
      <h2>Latest Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.name} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderRefetchComponent;
