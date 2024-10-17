<script lang="ts">
  import CartEntry from "@/components/cart_entry.svelte";
  import { cart as cartItems } from "@/store/basics";

  let total_price = 0;
  $: {
    $cartItems.forEach((item) => {
      let q = item.quantity;
      total_price += item.product.price;
    });
  }
</script>

<div class="px-4 w-screen overflow-x-hidden md:mx-auto my-12">
  <div class="bg-zinc-850 shadow-lg rounded-lg overflow-hidden">
    <div class="p-4">
      {#each $cartItems.map((x) => x.product) as item (item._id)}
        <CartEntry {...item} />
      {/each}
      {#if $cartItems.length == 0}
        <div
          class="h-full grid place-items-center text-center w-full select-none"
        >
          <strong class="break-words text-white/80 text-xl"
            >( Cart is empty )
          </strong>
        </div>
      {/if}
    </div>
  </div>
</div>
<!-- checkoutt  -->
<div class="overflow-x-hidden bottom-8 fixed w-screen grid place-items-center">
  <div class="px-5 py-6 rounded-xl bg-[#1a1a1a] w-[80%]">
    <div class="flex justify-between items-center">
      <span class="font-bold text-lg">Total:</span>
      <span class="font-bold scale-110 text-2xl">${total_price}</span>
    </div>

    <div class="w-full flex items-center justify-center">
      <button
        on:click={() => {
          console.log($cartItems);
        }}
        class="mt-6 text-center inline-block w-full md:w-1/2 mx-auto shrink-0 rounded-md border border-white bg-white/90 px-12 py-3 text-md font-bold text-[#1a1a1a] transition hover:bg-transparent hover:text-white focus:outline-none focus:ring"
      >
        Checkout {$cartItems.length} Item{$cartItems.length > 1 ? "s" : ""}
      </button>
    </div>
  </div>
</div>
