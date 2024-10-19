<script lang="ts">
  import CartEntry from "@/components/cart_entry.svelte";
  import { cart as cartItems } from "@/store/basics";

  let total_price = 0;
  let final_price = 0;
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  $: {
    total_price = sum($cartItems.map((x) => x.product.price * x.quantity));
    final_price = sum(
      $cartItems.map(
        (x) =>
          Math.round(
            x.product.price - (x.product.discount * x.product.price) / 100,
          ) * x.quantity,
      ),
    );
  }
</script>

<div class="px-4 w-screen overflow-x-hidden md:mx-auto my-12">
  <div class="bg-zinc-850 shadow-lg rounded-lg overflow-hidden">
    <div class="p-4">
      {#each $cartItems as item (item.product._id)}
        <CartEntry product={item.product} quantity={item.quantity} />
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
  <div class="px-5 py-6 rounded-xl relative bg-[#1a1a1a] w-[80%]">
    {#if total_price !== final_price}
      {@const tdiscount = Math.round(
        100 - Math.round((final_price / total_price) * 100),
      )}
      <span
        class="font-black tracking-tighter uppercase py-0.5 px-1.5 absolute bottom-0 rounded-bl-xl left-0 bg-red-700 text-lg"
        >TOTAL {tdiscount}% OFF</span
      >
    {/if}
    <div class="flex justify-between items-center">
      <span class="font-bold text-lg">Total:</span>
      <strong class="font-bold scale-110 text-2xl">
        <span
          class="font-normal mr-1 text-lg line-through text-white/40 tracking-normal"
          >${total_price}</span
        >
        ${final_price}
      </strong>
    </div>

    <div class="w-full flex items-center justify-center">
      <button
        on:click={() => {
          console.log($cartItems);
        }}
        disabled={$cartItems.length == 0}
        class="mt-6 text-center inline-block w-full md:w-1/2 mx-auto shrink-0 rounded-md border border-white bg-white/90 px-12 py-3 text-md font-bold text-[#1a1a1a] transition hover:bg-transparent hover:text-white focus:outline-none ring-0 disabled:opacity-60 focus:ring-0"
      >
        Checkout {$cartItems.length} Item{$cartItems.length > 1 ? "s" : ""}
      </button>
    </div>
  </div>
</div>
