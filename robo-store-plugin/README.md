<h1 align="center">🛒 Robo Store 🛒</h1>
<h2 align="center">Robo.js Plugin</h2>

<p align="center">
    <img alt="hero" width="450" src="https://emoji-route.deno.dev/svg/🛒" />
</p>

> [!NOTE]
>
> Welcome to **robo-store**, a minimalist yet powerful eCommerce plugin for **Robo.js**! This plugin integrates a dynamic storefront, Discord slash commands, and an API-powered backend to provide a comprehensive shopping experience. Perfect for exclusive communities, **robo-store** lets you create a member-only shopping platform with seamless Discord integration, beautiful Astro-powered storefronts, and easy management through customizable options.

## 🌟 Features

> **robo-store** brings a minimal eCommerce solution right into your Discord server and online presence:

- **Discord Slash Commands** – Manage your store directly from Discord with commands for adding products, listing items, placing orders, and more.
- **Backend Server API** – A fully functional API for handling store data, from product information to customer orders.
- **Agnostic Storefront Support** – A fast, customizable, and responsive web interface that can be integrated with any frontend framework or technology, making it perfect for showcasing products flexibly.
- **Customizable Options** – Set your store name, branding, introduction, and more with a flexible configuration system.
- **Seamless Discord Integration** – Supports Discord login for easy customer access, with seamless order management.

## 🛠 Installation

> You can add [**robo-store**](https://www.npmjs.com/package/robo-store) with one command via **Robo CLI**:

###### terminal

```bash
# Using Robo CLI
npx robo add robo-store
# Or if using pnpm, yarn, or bun:
pnpm robo add robo-store
yarn robo add robo-store
bun robo add robo-store
```

---

## 📂 Configuration

To configure your **robo-store** plugin, configure your plugin config with the following options:

###### [/config/plugins/robo-store.ts](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-demo/config/plugins/robo-store.ts)

```javascript
export default {
	mongo_uri: 'your-mongodb-uri',
	owner_id: 'discord-user-id',
	store_name: 'Your Store Name',
	domain: 'https://yourstore.com',
	slogan: 'Your Store Slogan',
	hero_image: 'link-to-hero-image',
	about_us: 'Description of your store',
	invite: 'Discord invite link',
	introduction: 'Brief intro for new customers',
	client_secret: 'discord-client-secret',
	client_id: 'discord-client-id',
	currency_symbol: '$',
	imgbb_api_key: 'optional-imgbb-api-key-for-image-hosting',
	port: 6969
};
```

> [!TIP]
> Most fields have default values if not provided, to streamline your setup!

## 📝 Plugin Options Reference

| Option            | Type     | Description                                                              | Default Value                                                                                        | Required? |
| ----------------- | -------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | --------- |
| `mongo_uri`       | `string` | MongoDB URI for storing user, product, and order data.                   | `process.env.MONGO_URI`                                                                              | Yes       |
| `owner_id`        | `string` | Your Discord user ID to link to the bot and manage store invites.        | None                                                                                                 | Yes       |
| `store_name`      | `string` | Display name of your store.                                              | "Store"                                                                                              | Yes       |
| `domain`          | `string` | Domain of your storefront. Used for product links and site navigation.   | None                                                                                                 | Yes       |
| `slogan`          | `string` | A catchy slogan for your store to attract customers.                     | "Grab The Products Now..."                                                                           | No        |
| `port`            | `number` | Deploy storefront and API to the host with port configuration.           | 3000                                                                                                 | No        |
| `hero_image`      | `string` | Link to a hero image displayed prominently on your store’s landing page. | None                                                                                                 | No        |
| `about_us`        | `string` | A paragraph describing your store and its community-driven value.        | "Welcome to our exclusive store, where premium products meet a close-knit community..."              | No        |
| `invite`          | `string` | Discord invite link for users to join your community.                    | `https://discord.com/users/${pluginOptions.owner_id}`                                                | No        |
| `introduction`    | `string` | Intro message displayed to new customers in the store.                   | "Exclusive products available only for our private community! Join our Discord to access special..." | No        |
| `client_secret`   | `string` | Discord bot client secret for authentication.                            | None                                                                                                 | Yes       |
| `client_id`       | `string` | Discord bot client ID.                                                   | `process.env.DISCORD_CLIENT_ID`                                                                      | No        |
| `currency_symbol` | `string` | Currency symbol for prices.                                              | "$"                                                                                                  | No        |
| `imgbb_api_key`   | `string` | API key for ImgBB if you want to host images externally.                 | None                                                                                                 | No        |

> **Check out the [example configuration file](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-demo/config/plugins/robo-store.ts) for more details.**

## 🚀 Quick Start

1. **Install the Plugin**: Quickly set up the plugin with just a few commands.
2. **Customize Your Store**: Use provided options like `store_name`, `slogan`, and `about_us` to make it yours.
3. **Run Your Bot**: Start the Discord bot, and let your customers explore your store through slash commands!
4. **Manage Products & Orders**: Use the backend API to add, update, and track products and orders.

---

## 🧩 Slash Commands

| Command                       | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `/store my-order-info`        | Display a list of all your orders.                      |
| `/store product-info`         | Retrieve detailed information about a specific product. |
| `/store products`             | Display a list of all available products.               |
| `/store admin apply-discount` | Apply a discount to the selected product.               |
| `/store admin delete`         | Remove a product from the store permanently.            |
| `/store admin new-product`    | Add a new product to the store.                         |
| `/store admin order-info`     | Retrieve detailed information about a specific order.   |
| `/store admin order-status`   | Update the status of an existing order.                 |
| `/store admin stockout`       | Mark a product as out of stock or back in stock.        |

## 🚀 Backend API

| **Route**                 | **Method** | **Description**                                               | **Params**        | **Request Type** | **Use**                                          |
| ------------------------- | ---------- | ------------------------------------------------------------- | ----------------- | ---------------- | ------------------------------------------------ |
| `/api`                    | GET        | Returns a basic message with the current time and portal data | None              | None             | To check the API status                          |
| `/api/login`              | GET        | Redirects to Discord OAuth login                              | None              | None             | To initiate Discord OAuth login                  |
| `/api/callback`           | GET        | Handles Discord OAuth callback                                | `code`            | Query            | To handle OAuth response and save tokens         |
| `/api/store`              | GET        | Returns store-related data like categories and settings       | None              | None             | To retrieve store configuration and categories   |
| `/api/store/products`     | GET        | Returns all available products in the store                   | None              | None             | To retrieve list of products                     |
| `/api/store/categories`   | GET        | Returns all product categories                                | None              | None             | To retrieve product categories                   |
| `/api/store/products/:id` | GET        | Returns a specific product by ID                              | `id` (Product ID) | None             | To retrieve a single product by its ID           |
| `/api/@me`                | GET        | Returns authenticated user's Discord profile data             | None              | None             | To fetch the logged-in user's profile data       |
| `/api/@me/avatar`         | GET        | Redirects to the user's avatar URL                            | None              | None             | To retrieve the user's avatar                    |
| `/api/@me/logout`         | GET        | Logs out the user by removing tokens                          | None              | None             | To log the user out and clear session cookies    |
| `/api/@me/orders`         | GET        | Returns the user's order history                              | None              | None             | To fetch the authenticated user's orders         |
| `/api/@me/order`          | POST       | Creates a new order with a cart of products                   | `cart` (Array)    | Body             | To create a new order for the authenticated user |

> This table lists all the main backend API routes, the HTTP method, their descriptions, required parameters, and the request type for each route.

---

## 🎥 Demo

###### [robo-store-screenshots/robo-store.mp4](https://github.com/ArnavK-09/robo-store/raw/refs/heads/main/robo-store-screenshots/robo-store.mp4)

https://github.com/user-attachments/assets/2332de81-c31b-4415-b5fe-a887dd9c4f6f

## 📷 Screenshots

> Here's a collection of screenshots showing various features and pages of the Robo Store.

| Hero Section                                                                                               |
| ---------------------------------------------------------------------------------------------------------- |
| ![Hero Section](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/hero_section.png) |

| Shop Products Page                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------- |
| ![Shop Products Page](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/shop_products_page.png) |

| Product Page                                                                                               |
| ---------------------------------------------------------------------------------------------------------- |
| ![Product Page](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/product_page.png) |

| Out of Stock Product Page                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------ |
| ![Out of Stock Product Page](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/out_of_stock_product_page.png) |

| Cart Preview                                                                                               |
| ---------------------------------------------------------------------------------------------------------- |
| ![Cart Preview](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/cart_preview.png) |

| Store My Order Info                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------ |
| ![Store My Order Info](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/store_my-order-info.png) |

| New Order Received Notification                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ![New Order Received Notification](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/new_order_recived_notification.png) |

| User Account on Storefront                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------- |
| ![User Account on Storefront](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/user_account_on_storefront.png) |

| Store Admin Apply Discount                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------- |
| ![Store Admin Apply Discount](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/store_admin_apply-discount.png) |

| Store Admin New Product                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------- |
| ![Store Admin New Product](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/store_admin_new-product.png) |

| Store Admin Order Status                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------- |
| ![Store Admin Order Status](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/store_admin_order-status.png) |

| Store Admin Stockout                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------- |
| ![Store Admin Stockout](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/store_admin_stockout.png) |

| Website                                                                                          |
| ------------------------------------------------------------------------------------------------ |
| ![Website](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/website.png) |

---

## 💻 Contributing

> [!TIP]  
> We welcome contributions to improve **robo-store**! If you have suggestions, bug fixes, or new feature ideas, follow these steps:

1. **Fork the Repository**  
   Click the **Fork** button at the top-right of the repo page.

2. **Clone Your Fork**  
   Clone the repo locally:

   ```bash
   git clone https://github.com/ArnavK-09/robo-store.git
   ```

3. **Create a Branch**  
   Create a new branch for your changes:

   ```bash
   git checkout -b your-feature-branch
   ```

4. **Make Changes**  
   Implement your changes (bug fixes, features, etc.).

5. **Commit and Push**  
   Commit your changes and push the branch:

   ```bash
   git commit -m "Description of changes"
   git push origin your-feature-branch
   ```

6. **Open a Pull Request**  
   Open a PR with a detailed description of your changes.

7. **Collaborate and Merge**  
   The maintainers will review your PR, request changes if needed, and merge it once approved.

## 🙋‍♂️ Issues

Found a bug or need help? Please create an issue on the [GitHub repository](https://github.com/ArnavK-09/robo-store/issues) with a detailed description.

## 👤 Author

<table>
  <tbody>
    <tr>
        <td align="center" valign="top" width="14.28%"><a href="https://github.com/ArnavK-09"><img src="https://github.com/ArnavK-09.png?s=100" width="100px;" alt="Arnav K"/><br /><sub><b>Arnav K</b></sub></a></td>
    </tr>
  </tbody>
</table>

## 🗺 Roadmap

<table>
  <tbody>
    <tr>
        <td align="center" valign="top" width="100%">🔒 Payment Wall</td>
    </tr>
  </tbody>
</table>

---

<h2 align="center">📄 License</h2>

<p align="center">
<strong>robo-store</strong> is licensed under the MIT License. See the <a href="https://github.com/ArnavK-09/robo-store/blob/main/robo-store-plugin/LICENSE">LICENSE</a> file for more details.
</p>

<h2 align="center">💖 Thanks for Using robo-store!</h2>
<p align="center">
Thank you for choosing <strong>robo-store</strong>! We hope this plugin helps you build an amazing eCommerce experience on Discord.
</p>

---

<p align="center">
    <strong>If you find this project helpful, please give it a ⭐ on GitHub!</strong>
</p>
