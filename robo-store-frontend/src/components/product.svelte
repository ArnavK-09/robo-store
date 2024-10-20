<script lang="ts">
  import { onMount } from "svelte";
  import Tagline from "@/components/tagline.svelte";
  import Store from "@/components/shop.svelte";
  import Loading from "./loading.svelte";
  import { type StoreProduct, storeDetails, cart } from "@/store/basics";
  import { writable } from "svelte/store";
  let productId: string | null = null;
  let product = writable<StoreProduct>();
  let quantity = writable<number>(1);
  onMount(async () => {
    console.log("Fetching Product!");
    const urlSearchParams = new URLSearchParams(window.location.search);
    productId = urlSearchParams.get("id");
    const response = await fetch("/api/store/products/" + productId);
    if (response.ok) {
      const data = await response.json();
      product.set(data);
      if (window) {
        window.document.title = `View ${$product.title} | ${storeDetails.value.store_name}`;
      }
    }
    if (!productId || !product) {
      window.location.href = window.location.origin;
    }
  });

  let finalPrice = $product
    ? Math.round($product.price - ($product.discount * $product.price) / 100)
    : 0;

  let productThere = false;

  $: {
    finalPrice = $product
      ? Math.round($product.price - ($product.discount * $product.price) / 100)
      : 0;
    productThere = $cart.find((x) => x.product._id == $product?._id);
  }
  const addProductToCart = () => {
    const localCartItems: Array<{ product: StoreProduct; quantity: number }> =
      JSON.parse((localStorage.getItem("cartItems") ?? []).toString());
    const isProductThere = localCartItems.find(
      (x) => x.product._id == $product._id,
    );
    if (!!isProductThere) return;
    localStorage.setItem(
      "cartItems",
      JSON.stringify([
        ...localCartItems,
        {
          product: $product,
          quantity: $quantity,
        },
      ]),
    );
    cart.set(JSON.parse(localStorage.getItem("cartItems")!));
  };
</script>

{#if productId?.length == 0 || !$product || !productId}
  <section
    class="transition ease-in-out h-screen z-[200] grid place-items-center w-screen bg-black backdrop-blur-md fixed top-0 left-0"
  >
    <div class="animate-spin">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-28 w-28"
        viewBox="0 0 14 14"
        ><g
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><path d="M10.5 3.5a3.5 3.5 0 0 1-7 0v-3h7Z" /><path
            d="M10.5 10.5a3.5 3.5 0 0 0-7 0v3h7Zm-9-10h11m-11 13h11"
          /></g
        ></svg
      >
    </div>
  </section>
{/if}
{#if $product}
  <section id="product" class="overflow-x-hidden">
    <div class="h-screen w-screen flex flex-col lg:flex-row gap-4 lg:px-4">
      <div class="w-full h-full grid place-items-center overflow-hidden p-3">
        <div
          class="bg-white/10 !relative h-full grid place-items-center select-none w-full group rounded-2xl lg:!aspect-[7/7] overflow-hidden p-4"
        >
          <img
            draggable="false"
            class="h-full w-auto lg:h-[70%] group-hover:scale-[1.02] transition ease-in-out duration-[270ms]"
            alt="product"
            src={$product.image}
          />
          {#if $product.discount !== 0}
            <span
              class="font-black tracking-tighter uppercase py-0.5 px-1.5 absolute top-0 rounded-tr-xl right-0 bg-red-700 text-lg"
              >FLAT {$product.discount}% OFF</span
            >
          {/if}
        </div>
      </div>
      <div class=" w-full h-full">
        <div class="w-full h-full px-4 relative grid place-items-start">
          <div class="block my-auto">
            <strong
              class="px-4 text-black mb-4 text-xl tracking-tight uppercase select-none bg-yellow-400 rounded-lg"
              >{$product.category}
            </strong>
            <h2 class="text-white uppercase text-4xl lg:text-5xl font-black">
              {$product.title}
            </h2>
            <h2
              class="text-green-500 uppercase text-4xl lg:text-5xl mt-3 mb-8 font-medium"
            >
              ${finalPrice}
              {#if finalPrice !== $product.price}
                <span
                  class="text-3xl lg:text-4xl font-thin ml-1 line-through text-white/40 tracking-normal"
                  >${$product.price}</span
                >
              {/if}
            </h2>
            <strong
              class="px-4 text-black my-4 text-2xl lg:text-3xl tracking-tight uppercase select-none bg-white rounded-lg font-semibold"
            >
              quantity
            </strong>
            <button
              on:click={() => {
                if ($quantity >= 10) {
                  quantity.set(10);
                } else {
                  quantity.set($quantity + 1);
                }
              }}
              class="text-white/90 select-none text-3xl hover:text-white"
            >
              &plus;
            </button>
            <input
              type="number"
              max="10"
              readonly
              min="1"
              name="number"
              bind:value={$quantity}
              class="rounded-xl focus:outline-none text-2xl bg-white/10 px-2 md:px-4 py-0.5 md:py-1 text-center mx-2 text-white/95 focus:border-none select-none focus:ring-0"
            />
            <button
              on:click={() => {
                if ($quantity <= 1) {
                  quantity.set(1);
                } else {
                  quantity.set($quantity - 1);
                }
              }}
              class="text-white/90 select-none text-3xl hover:text-white"
            >
              &minus;
            </button>
          </div>
          <button
            on:click={addProductToCart}
            disabled={!!productThere}
            class="mt-4 disabled:opacity-50 hover:scale-[1.02] transition ease-in-out lg:mt-1 bg-[#365de5] w-full tracking-tighter text-2xl uppercase select-none rounded-xl py-6 text-center font-bold"
          >
            {!!productThere ? "ALREADY IN CART" : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
    {#if $product.description}
      <div
        class="select-noneblock w-screen px-10 mx-auto border-y border-white/10 my-10 py-8"
      >
        <strong
          class="px-4 mb-5 text-black my-4 text-2xl lg:text-3xl tracking-tight uppercase select-none bg-white rounded-lg font-semibold"
        >
          PRODUCT DESCRIPTION
        </strong>
        <br /><br />
        <p
          class="text-lg lg:text-xl !font-thin tracking-tighter break-words text-white/80"
        >
          {$product.description}
        </p>
      </div>
    {/if}
    <div
      class="select-noneblock w-screen px-10 mx-auto border-y border-white/10 my-10 py-8"
    >
      <strong
        class="px-4 mb-5 text-black my-4 text-2xl lg:text-3xl tracking-tight uppercase select-none bg-white rounded-lg font-semibold"
      >
        ABOUT US
      </strong>
      <br /><br />
      <p
        class="text-lg lg:text-xl !font-thin tracking-tighter break-words text-white/80"
      >
        {$storeDetails.about_us ?? $storeDetails.introduction}
      </p>
    </div>
    <Tagline />
    <br />
    <Store />
  </section>
{/if}
