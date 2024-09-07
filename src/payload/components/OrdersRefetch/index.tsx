import axios from "../../../app/shared/lib/axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "payload/components/utilities";

const OrdersComponent = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // IMPROVEMENT REQUIRED. ADD CUSTOM TABLE. REDIRECT BY ID. LIMIT QUERY DATA.
  console.log("user", user);
  useEffect(() => {
    let intervalId;

    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data } = await axios("http://localhost:3000/api/graphql", {
          method: "POST",
          data: {
            query: `
            query Orders($page: Int!, $limit: Int!) {
              Orders(
                limit: $limit,
                page: $page,
                sort: "-createdAt"
              ) {
                docs {
                  id
                  district
                  apartment
                  houseNumber
                  orderStatus
                  deliveryPrice
                  isDelivery
                  totalAmount
                  restaurantName
                  dishes {
                    quantity
                    dish {
                      title
                      price
                    }
                  }
                  createdAt
                }
              }
            }
          `,
            variables: { limit: 20, page: 1 },
          },
        });
        console.log("data.data", data.data);

        setOrders(data.data.createOrder);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    // Fetch orders immediately and set up interval fetching
    fetchOrders();
    intervalId = setInterval(() => {
      fetchOrders();
    }, 4000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Orders</h3>
      <ul>
        {orders?.length ? (
          orders.map((order) => (
            <li key={order.id}>
              {order.title} - {order.createdAt}
            </li>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </ul>
    </div>
  );
};

export default OrdersComponent;
