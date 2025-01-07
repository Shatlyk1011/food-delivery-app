# Ashpez - Multivendor Food delivery Application

<p align="center">
  <a href="https://ashpez-food-delivery-app.vercel.app/en" target="_blank"><img height="360" src="public/ashpez-banner.jpg?raw=true" alt="Ashpez food delivery application"></a>
</p>

Fullstack food ordering application build with Payload CMS and Next 15. <br/>
This application supports both user-facing features for ordering food and an admin panel for restaurant management. The application is fully responsive, ensuring optimal usability on mobile devices.

### Demo

**Live demo: [Ashpez](https://ashpez-food-delivery-app.vercel.app/)**


## **Technology Stack**

### Design
- Figma design - [link](https://www.figma.com/design/Br44bFbR9vLmNzTNTmilvp/%D0%A1%D0%A1Client?node-id=2-9&t=wYkMxqeS3T0EnBK0-1)

### Frontend
- **Next.js 15**: with app router and i18n.
- **ShadCN**: Styled with ShadCN components for consistent and aesthetic design.
- **GraphQL**: Integrated with GraphQL for efficient and flexible querying of data from the backend.
- **TanStack Query**: for client-side data fetching and caching.
- **Jotai**: Managed with Jotai for flexible and simple state handling.
- **Zod**: Validation library with Zod
- **Next-intl**: Implemented using next-intl to support multilingual user interfaces.
- **Seo Friendly**: 

### Backend and Database
- **Payload CMS**: for flexible and scalable data management.
- **MongoDB**: A NoSQL database for efficient data storage and retrieval.

## **Features**

### Client side features

- **Registration and Login**: Users can create an account or log in to access personalized features.
- **Order Foods**: Browse, select, and order food from restaurants.
- **Order Tracking**: Real-time updates on the status of placed orders.
- **Order Amount**: Display of the total cost of an order.
- **Order History**:  A dedicated profile page for users to view their past or current orders.
- **City Selection**:  Choose the delivery city for location-specific offerings. (planned)
- **Feedback Submission**:  Users can send feedback to improve services or rate their experience. (planned)
- **Multivendor Support**: Allows multiple restaurants to list, manage, and sell products on a single platform.


### Admin Panel Features

   * The admin panel provides role-based access, supporting the following roles:
      * Admin (admin): full access to all featuers and settings.
      * Restaurant Owner (author): control the restaurant, dishes and orders for his own restaurants
      * Guest (guest): viewing purposes only.

### How it works
1)  Admin Creates Restaurant Owners (Authors):

   * The first admin user creates restaurant owners by adding their login credentials (email and password) in the **Customers** schema.

2) Admin Creates Restaurants:

   * The admin sets up the restaurant profile, including its information and images.
   * The admin assigns access to the newly created restaurant owner, linking them to their respective user (**Customer**).

3) Restaurant Owner Access:
   * The restaurant owner logs in to the admin panel using the provided credentials.
   * They can view and manage only their assigned restaurant.

4) Managing Restaurant Information:

   * The restaurant owner can update the restaurant's profile, description, images etc.
   * They can create, edit, or delete dishes associated with their restaurant.
   * The created dishes need to be added to the restaurant's menu.

5) Order Management:

   * The restaurant owner can view orders placed by customers for their restaurant.
   * They can update the order statuses, which will reflect directly in the user profiles.


## Getting Started

Follow these steps to set up and run the application locally:

### Requirement 
1. **Node.js**: Ensure you have Node.js (version 18 or higher) installed.
2. **MongoDB**: Set up a MongoDB instance.
3. **Environment variables**: Set up database URI and payload_secret .

###### for more information visit [Payload MongoDB setup section](https://payloadcms.com/docs/database/mongodb)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shatlyk1011/food-delivery-app
   ```
2. Navigate to the project directory:
   ```bash
   cd food-delivery-app
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   npm install
   ```

### Running the Application

1. Start the Payload CMS backend:
   ```bash
   npm run dev
   ```

2. Open your browser and visit `http://localhost:3000` to see the application in action.

//here
## Contributing

We welcome contributions to improve the Multivendor Application! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on the process.

## License

This project is licensed under the [MIT License](LICENSE).

---

Stay tuned for more updates and enhancements. If you encounter any issues, feel free to create an issue in the repository.
