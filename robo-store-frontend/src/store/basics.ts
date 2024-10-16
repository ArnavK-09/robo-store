import { atom } from "nanostores";

interface StoreDetails {
  store_name: string;
  categories: string[];
  domain?: string;
  introduction: string;
  owner_id?: string;
  about_us?: string;
  invite?: string;
  slogan: string;
}
interface StoreProduct {
  _id: string;
  title: string;
  price: number;
  image: string;
  createdAt: Date;
  stockout: boolean;
  description?: string;
  category?: string;
  discount: number;
}

export const storeDetails = atom<StoreDetails>({
  store_name: "Store",
  categories: [],
  slogan: "on sale",
  introduction:
    "Welcome to our exclusive store, where premium products meet a close-knit community. We’re not just any shop—our offerings are available only to those who join our private Discord server. As part of our community, you'll get early access to limited-edition items, special discounts, and insider perks. We're all about creating a seamless, personalized shopping experience with fast shipping, secure payments, and top-notch support. Connect with like-minded individuals, discover unique products, and enjoy a shopping experience built around you. Join us on Discord and become part of something special!",
});

export const storeProducts = atom<StoreProduct[]>([]);

export const isHamburgerMenuOpen = atom<boolean>(false);
