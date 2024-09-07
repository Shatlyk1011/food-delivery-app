# release

10.09.2024

- ci/cd
- buy server

## api

✅ - learn to work with graphql
✅ - create Orders collection. learn how to work with forms with payload.
✅ (not tested yet)- add fields to user collection: addresses, isBlocked, history of Orders

✅ - make restaurant blockable

- seo (edil ozi)
- add order field to restaurants

<!-- - add filter orders in profile -->

- ✅ interval fetch orders
  <!-- - dish isChange flag -->

  ✅ - order statuses

- categories for dishes and restaurants (names)
- ✅ request orders by users id in profile page (interval)
- add description in collections
<!-- ex: https://github.com/payloadcms/public-demo/blob/master/src/payload/collections/Media.ts -->

- test test test

## client

✅- enable auth
✅- fix all form translates, validations

- create address function
- handle comment to restaurant

-✅ LANGUAGE BUUUG!

- client categories field

- ✅ (use url) default images
- ✅ hide search if its not in main page
- ✅ button states (loading, pending, disabled)
- ✅ Check Mini Items UI Data
- ✅ add snackbar
- ✅ free delivery ui (yx-eat)
  <!-- - add filter ui in profile -->
  ✅ - if count > totalAmount, show snackbar with warning
  ✅ - self care address message
- Footer modals (feedback, report)
  <!-- - profile page (with add/remove addresses) -->
  ✅- dishes info modal (on click, lazy load)
- ✅ is delivery state on bucket page
- ✅ komentary restoranu (input)
- ✅ free after amount ui block in id page
- ✅ localstorage timestamp
<!-- - bucket form submittion modal () -->
- mobile sidebar, login, logout states
- ✅ if availabelAmount === 0, disable dish
- ✅ profile interval order fetch (tailwind ping)
- redirect to main page, if last item were deleted in bucket page
- restaurant by id. if no restaurant, show no rest ui

## backlog

- disable self care (temporary) - add time functionality in form - later
- global promocodes
- phone validation

// REFETCH INSTRUCTION

<!-- To automatically refetch the orders collection every 10-15 seconds in the Payload CMS admin panel, you can utilize custom admin panel hooks and the useEffect hook in combination with the refetch function.

Payload CMS allows you to extend its admin panel using beforeDashboard or custom components where you can implement such functionality. Here's a step-by-step guide on how you can achieve this:

Step-by-Step Solution:
1. Extend Admin Panel Dashboard
You can add custom components that will handle the fetching of data within the admin panel. For refetching the orders every 10-15 seconds, you'd use a React component with useEffect and setInterval to handle periodic refetches.

Create a custom component for refetching orders.

2. Create a Custom Component for Refetching Orders
You can create a React component that fetches the orders and implements a periodic refetch using useEffect.

js
Copy code
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

// Define your orders fetch function
const fetchOrders = async () => {
  const { data } = await axios.get('/api/orders');
  return data;
};

const OrderRefetchComponent = () => {
  const [orders, setOrders] = useState([]);

  const { data, refetch } = useQuery('orders', fetchOrders, {
    refetchInterval: false, // We will handle interval manually
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Refetching orders...");
      refetch(); // Manually trigger refetch every 10-15 seconds
    }, 10000); // 10 seconds (adjust to 15000 for 15 seconds if needed)

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  return (
    <div>
      <h2>Latest Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>{order.name} - {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderRefetchComponent;


3. Add Component to Admin Panel
Next, you'll need to integrate this custom component into the Payload CMS admin dashboard.

In your Payload CMS configuration file, you can use the beforeDashboard hook to inject this component into the admin panel.

js
Copy code
import OrderRefetchComponent from './path-to-your-component/OrderRefetchComponent';

export const collections = [
  {
    slug: 'orders',
    labels: {
      singular: 'Order',
      plural: 'Orders',
    },
    admin: {
      useAsTitle: 'name',
      components: {
        beforeDashboard: [OrderRefetchComponent], // Inject the refetching component
      },
    },
    fields: [
      // Your fields for the orders collection
    ],
  },
];
4. Configure the Interval Time
In the useEffect hook within OrderRefetchComponent, you can set the interval time to either 10 seconds (10,000 ms) or 15 seconds (15,000 ms) depending on your requirements:

js
Copy code
useEffect(() => {
  const interval = setInterval(() => {
    refetch(); // Manually trigger refetch every 10-15 seconds
  }, 10000); // 10 seconds (adjust to 15000 for 15 seconds)

  return () => clearInterval(interval); // Cleanup interval on unmount
}, [refetch]);
5. Adjust the API Endpoint
In the fetchOrders function, make sure that the endpoint /api/orders matches your actual API endpoint for fetching the orders collection from Payload CMS. You may need to adjust it based on your API structure.

Result:
With this setup, the orders collection will automatically refetch in the Payload CMS admin panel every 10-15 seconds. This will ensure that the data stays up to date without manually refreshing the page.
 -->
