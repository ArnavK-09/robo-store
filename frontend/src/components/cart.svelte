<script lang="ts">
    import CartEntry from "@/components/cart_entry.svelte";
    import { writable } from 'svelte/store';
    interface CartItem {
        name: string;
        image: string;
        price: number;
        quantity: number;
    }

    const items:CartItem[] =[{
        name: "Objec",
        image: "https://i.ibb.co/jw8W3T2/hmlv-mug-006-removebg-preview.png",
        price: 2323,
        quantity: writable<number>(1)
    }] 
    let total_price = 0;
    $: {
        items.forEach(item => {
            let q = item.quantity
            total_price += item.price
        });
    }
</script>

<div class="p-4 w-full md:mx-auto my-12">
    <div class="bg-zinc-850 shadow-lg rounded-lg overflow-hidden">
        <div class="p-4">
            <!-- items  -->
             {#each items as item }
             <CartEntry {...item}/>
             {/each}
            <!-- items end  -->
        </div>
        <div class="px-5 py-6 bg-[#1a1a1a]">
            <div class="flex justify-between items-center">
                <span class="font-bold text-lg">Total:</span>
                <span class="font-bold text-lg">${total_price}</span>
            </div>

            <div class="w-full flex items-center justify-center">
                <button
                on:click={() => {
                    console.log(items)
                }}
                    class="mt-6 text-center inline-block w-full md:w-1/2 mx-auto shrink-0 rounded-md border border-white bg-white/90 px-12 py-3 text-md font-bold text-[#1a1a1a] transition hover:bg-transparent hover:text-white focus:outline-none focus:ring"
                >
                    Checkout {items.length} Items
                </button>
            </div>
        </div>
    </div>
</div>
