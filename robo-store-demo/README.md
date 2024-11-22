<h1 align="center">🛒 Robo Store Demo 🛒</h1>
<h2 align="center">Demo of robo-store plugin</h2>

<p align="center">
    <img alt="hero" width="450" src="https://emoji-route.deno.dev/svg/🛒" />
</p>

> [!NOTE]
> This folder contains a **demo configuration** for the **robo-store plugin** to help you quickly set up and test your eCommerce store.

---

## 🎯 Demo Configuration

In the **[`robo-demo/config/plugins/robo-store.mjs`](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/robo-store-demo/config/plugins/robo-store.mjs)** file, you'll find a sample configuration for the **robo-store plugin**. This includes default settings and options that can be easily customized to match your store's needs.

### How to Use

1. **Customize the Configuration**:
   Open the **[`robo-demo/config/plugins/robo-store.mjs`](https://github.com/ArnavK-09/robo-store/blob/main/robo-store-screenshots/robo-store-demo/config/plugins/robo-store.mjs)** file and update the following options:

   - `store_name`: Set your store's name.
   - `domain`: Your storefront domain.
   - `slogan`, `about_us`, and more!

2. **Run the Demo**:
   Use the **Robo CLI** to run your demo store and test the configuration.

3. **Test Your Store**:
   Access the demo store frontend and explore the configuration in action.

### ⚙️ Configuration Example:

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
	imgbb_api_key: 'optional-imgbb-api-key-for-image-hosting'
};
```

## 📝 Plugin Options Reference

| Option            | Type     | Description                                                              | Default Value                                                                                        | Required? |
| ----------------- | -------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | --------- |
| `mongo_uri`       | `string` | MongoDB URI for storing user, product, and order data.                   | `process.env.MONGO_URI`                                                                              | Yes       |
| `owner_id`        | `string` | Your Discord user ID to link to the bot and manage store invites.        | None                                                                                                 | Yes       |
| `store_name`      | `string` | Display name of your store.                                              | "Store"                                                                                              | Yes       |
| `domain`          | `string` | Domain of your storefront. Used for product links and site navigation.   | None                                                                                                 | Yes       |
| `slogan`          | `string` | A catchy slogan for your store to attract customers.                     | "Grab The Products Now..."                                                                           | No        |
| `hero_image`      | `string` | Link to a hero image displayed prominently on your store’s landing page. | None                                                                                                 | No        |
| `about_us`        | `string` | A paragraph describing your store and its community-driven value.        | "Welcome to our exclusive store, where premium products meet a close-knit community..."              | No        |
| `invite`          | `string` | Discord invite link for users to join your community.                    | `https://discord.com/users/${pluginOptions.owner_id}`                                                | No        |
| `introduction`    | `string` | Intro message displayed to new customers in the store.                   | "Exclusive products available only for our private community! Join our Discord to access special..." | No        |
| `client_secret`   | `string` | Discord bot client secret for authentication.                            | None                                                                                                 | Yes       |
| `client_id`       | `string` | Discord bot client ID.                                                   | `process.env.DISCORD_CLIENT_ID`                                                                      | No        |
| `currency_symbol` | `string` | Currency symbol for prices.                                              | "$"                                                                                                  | No        |
| `imgbb_api_key`   | `string` | API key for ImgBB if you want to host images externally.                 | None                                                                                                 | No        |

---

## 👤 Author

<table>
  <tbody>
    <tr>
        <td align="center" valign="top" width="14.28%"><a href="https://github.com/ArnavK-09"><img src="https://github.com/ArnavK-09.png?s=100" width="100px;" alt="Arnav K"/><br /><sub><b>Arnav K</b></sub></a></td>
    </tr>
  </tbody>
</table>

<h2 align="center">💖 Thanks for Using robo-store!</h2>
<p align="center">
Thank you for choosing <strong>robo-store</strong>! We hope this plugin helps you build an amazing eCommerce experience on Discord.
</p>

---

<p align="center">
    <strong>If you find this project helpful, please give it a ⭐ on GitHub!</strong>
</p>
