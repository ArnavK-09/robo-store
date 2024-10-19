<script lang="ts">
  import { type StoreProduct, cart } from "@/store/basics";
  import { writable } from "svelte/store";
  export let product: StoreProduct;
  export let quantity: number;

  const QTY = writable<number>(quantity);

  $: {
    updateQTY($QTY);
  }

  const removeItem = () => {
    const localCartItems: Array<{ product: StoreProduct; quantity: number }> =
      JSON.parse((localStorage.getItem("cartItems") ?? []).toString());

    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        localCartItems.filter((x) => x.product._id !== product._id),
      ),
    );
    cart.set(JSON.parse(localStorage.getItem("cartItems")!));
  };
  const updateQTY = (q: number) => {
    const localCartItems: Array<{ product: StoreProduct; quantity: number }> =
      JSON.parse((localStorage.getItem("cartItems") ?? []).toString());
    const productIndex = localCartItems.findIndex(
      (x) => x.product._id == product._id,
    );
    localCartItems[productIndex].quantity = q;
    localStorage.setItem("cartItems", JSON.stringify(localCartItems));
    cart.set(JSON.parse(localStorage.getItem("cartItems")!));
  };
</script>

<div class="flex items-center mb-4 select-none">
  <img
    class="h-auto w-16 object-contain rounded-lg mr-4"
    src={product.image}
    alt="Product"
    draggable="false"
    oncontextmenu="return false"
  />
  <div class="flex-1">
    <a
      class="text-lg font-bold text-white hover:underline hover:underline-offset-4"
      href={`/product?id=${product._id}`}>{product.title}</a
    ><br />
    <span class="text-white/90">${product.price}</span>
  </div>
  <div
    class="scale-80 md:scale-100 flex items-center justify-center text-center align-center"
  >
    <button
      on:click={() => {
        if ($QTY >= 10) {
          QTY.set(10);
        } else {
          QTY.set($QTY + 1);
        }
      }}
      class="text-white/90 text-3xl hover:text-white"
    >
      &plus;
    </button>
    <input
      type="number"
      max="10"
      min="1"
      readonly
      name="number"
      on:input={(e) => {
        const newVal = parseInt(e.target.value);
        QTY.set(newVal);
      }}
      bind:value={$QTY}
      class="rounded-3xl focus:outline-none bg-zinc-900 px-2 md:px-4 py-0.5 md:py-1 w-10 md:w-16 text-center mx-2 text-white/95 focus:border-none select-none focus:ring-0"
    />
    <button
      on:click={() => {
        if ($QTY <= 1) {
          removeItem();
        } else {
          QTY.set($QTY - 1);
        }
      }}
      class="text-white/90 text-3xl hover:text-white"
    >
      &minus;
    </button>
  </div>
</div>
