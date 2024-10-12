import { atom } from 'nanostores';

interface StoreDetails {
    store_name: string,
    categories: string[],
    domain?: string;
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
    store_name: 'Store',
    categories: []
});

export const storeProducts = atom<StoreProduct[]>([]);

export const isHamburgerMenuOpen = atom<boolean>(false);