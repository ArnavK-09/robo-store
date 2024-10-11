import { atom } from 'nanostores';

interface StoreDetails {
    store_name: string,
    categories: string[],
    domain?: string;
}

export const storeDetails = atom<StoreDetails>({
    store_name: 'Store',
    categories: ['All']
});

export const isHamburgerMenuOpen = atom<boolean>(false);