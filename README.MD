# Ashpez - Food Delivery Application

<p align="center">
  <a href="https://ashpez-food-delivery-app.vercel.app/en" target="_blank"><img height="360" src="public/ashpez-banner.jpg?raw=true" alt="Ashpez food delivery application"></a>
</p>

Fullstack food ordering application build with Payload CMS and Next 14. <br/>
This application supports both user-facing features for ordering food and an admin panel for restaurant management. The application is fully responsive, ensuring optimal usability on mobile devices.

### Demo 🎥

_Live demo:_ [Ashpez Client](https://ashpez-food-delivery-app.vercel.app/) <br/>
_Admin panel:_ [Ashpez Admin](https://ashpez-food-delivery-app.vercel.app/admin)

### Demo Accounts

The following accounts have **Admin** rights but cannot make any changes:

- **Guest Account 1**

  - **Login:** `guest1@gmail.ru`
  - **Password:** `guest123`

- **Guest Account 2**
  - **Login:** `guest2@gmail.ru`
  - **Password:** `guest456`

## If you found this project useful, please consider giving it a ⭐️ on [GitHub](https://github.com/Shatlyk1011/food-delivery-app). It helps a lot and motivates further improvements!

### Project structure 🗂️

```shell
.
├── README.md                       # README file
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── locales                         # I18N files
├── public                          # Static assets folder
│   └── api/media/file              # Locally stored images
├── src                             # Source code directory
│   ├── app                         # Core application folder
│   │   ├── (pages)              # Frontend part of the application
│   │   │   ├── _providers          # Global Provider configurations (e.g., Jotai, TanStack)
│   │   │   └── [locale]            # Locale-specific pages wrapped for i18n
│   │   ├── (payload)               # Payload CMS (backend-related configurations)
│   │   │   ├── admin               # Payload Admin Panel (auto-generated)
│   │   │   ├── api                 # Payload API configurations (auto-generated)
│   │   │   └── collections         # Payload CMS collections and schemas
│   │   ├── components              # UI components grouped by page or feature (widget)
│   │   ├── hooks                   # Reusable custom hooks
│   │   ├── icons                   # JSX component icons
│   │   ├── services                # TanStack-based service layer
│   │   │   └── query               # GraphQL query and mutation schemas
│   │   ├── shared                  # Shared utilities and helpers
│   │   └── widgets                 # Groups of components forming self-contained widgets
│   ├── i18n                        # next-intl configuration files
│   ├── payload-types.ts            # Auto-generated Payload CMS type definitions
│   └── payload.config.ts           # Payload CMS configuration file
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration file

```

#### for more information about payload.config.ts, payload collections and docker configuration visit the official [payload docs](http://payloadcms.com/)

## **Technology Stack** 🛠️

### Design 🎨

- Figma design - [link](https://www.figma.com/design/Br44bFbR9vLmNzTNTmilvp/%D0%A1%D0%A1Client?node-id=2-9&t=wYkMxqeS3T0EnBK0-1)

### Frontend 💻

- **Next.js 14**: with app router and i18n (upgraded to 15).
- **ShadCN**: Styled with ShadCN components for consistent and aesthetic design.
- **GraphQL**: Integrated with GraphQL for efficient and flexible querying of data from the backend.
- **TanStack Query**: for client-side data fetching and caching.
- **Jotai**: Managed with Jotai for flexible and simple state handling.
- **Zod**: Validation library with Zod in pair with `react-hook-form`
- **I18N**: Implemented using next-intl to support multilingual user interfaces.
- **Responsive** - Full Responsive Desktop First Web App with custom sidebar and menu drawer component for mobile devices.
- **A11Y** - Keyboard control over all interactive elements
- **Seo Friendly**

### Backend and Database ⚙️🗄️

- **Payload CMS**: for flexible and scalable data management.
- **MongoDB**: A NoSQL database for efficient data storage and retrieval.

## **Features** ✨

### Client side features 🖥️

- **Registration and Login**: Users can create an account or log in to access personalized features.
- **Order Foods**: Browse, select, and order food from restaurants.
- **Order Tracking**: Real-time updates on the status of placed orders.
- **Order Amount**: Display of the total cost of an order.
- **Order History**: A dedicated profile page for users to view their past or current orders.
- **City Selection**: Choose the delivery city for location-specific offerings. (planned)
- **Feedback Submission**: Users can send feedback to improve services or rate their experience. (rate planned)

### Admin Panel Features 🛡️

- **Multivendor Support**: Allows multiple restaurants to list, manage, and sell products on a single platform.

- The admin panel provides role-based access, supporting the following roles:
  - Admin (admin): full access to all featuers and settings.
  - Restaurant Owner (author): control the restaurant, dishes and orders for his own restaurants
  - Guest (guest): viewing purposes only.

### How it works 🌀

1.  Admin Creates Restaurant Owners (Authors):

- The first admin user creates restaurant owners by adding their login credentials (email and password) in the **Customers** schema.

2. Admin Creates Restaurants:

   - The admin sets up the restaurant profile, including its information and images.
   - The admin assigns access to the newly created restaurant owner, linking them to their respective user (**Customer**).

3. Restaurant Owner Access:

   - The restaurant owner logs in to the admin panel using the provided credentials.
   - They can view and manage only their assigned restaurant.

4. Managing Restaurant Information:

   - The restaurant owner can update the restaurant's profile, description, images etc (except the name of the Restaurant).
   - They can create, edit, or delete dishes associated with their restaurant.
   - The created dishes need to be added to the restaurant's menu.

5. Order Management:

   - The restaurant owner can view orders placed by customers for their restaurant.
   - They can update the order statuses, which will reflect directly in the user profiles.

## Getting Started 🚀

Follow these steps to set up and run the application locally:

### Requirements 📋
1. **Node.js**: Ensure you have Node.js (version 18 or higher) installed.
2. **MongoDB**: Set up a MongoDB instance.
3. **Environment variables**: Set up `DATABASE_URI` and `PAYLOAD_SECRET` .

##### for more information visit [Payload MongoDB setup section](https://payloadcms.com/docs/database/mongodb)

### Important Note on Local Development ⚠️

When developing locally, **avoid logging into both the app and the admin panel in the same browser session**. This is because the authentication token names for the client and admin panel are identical, and this can cause unexpected behavior or conflicts. If this already happened, clear your `cookie` and `localStorage`.

To avoid conflicts:

- Use a **different browser** for the admin panel and the app.
- Alternatively, open the admin panel in a **private/incognito window**.

### Installation 📦

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

### Running the Application ⚙️

4. Start the appliaction with admin panel:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` to see the application in action.

6. Open `http://localhost:3000/admin`. Register your first user with **admin** role and see the Payload CMS admin panel in action.

## Contributing 🤝

Contributions to the project are highly appreciated. Feel free to fork the repo, make your changes, and submit a pull request. You can also open issues to suggest improvements or report bugs.

## License 📜

Licensed under the [MIT license](https://github.com/Shatlyk1011/food-delivery-app/blob/main/LICENCE.md).

---
