<script lang="ts">
  import { onMount } from "svelte";
  import Tagline from "@/components/tagline.svelte";
  import Store from "@/components/shop.svelte";
  import Loading from "./loading.svelte";
  import { type StoreProduct, storeDetails, cart } from "@/store/basics";
  import { writable } from "svelte/store";
  let productId;
  let product: StoreProduct;
  let quantity = writable<number>(1);
  onMount(async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    productId = urlSearchParams.get("id");
    const response = await fetch("/api/store/products/" + productId);
    if (response.ok) {
      const data = await response.json();
      product.set(data);
    }
    if (!productId || !product) {
      window.location.href = window.location.origin;
    }
  });

  const addProductToCart = () => {
    $cart.update([
      ...$cart,
      {
        product: product,
        quantity: $quantity,
      },
    ]);
  };
</script>

{#if productId?.length == 0 || !product || !productId}
  <Loading />
{/if}
{#if product}
  <section id="product" class="overflow-x-hidden">
    <div class="h-screen w-screen flex flex-col lg:flex-row gap-4 lg:px-4">
      <div class="w-full h-full grid place-items-center overflow-hidden p-3">
        <div
          class="bg-white/10 h-full grid place-items-center select-none w-full group rounded-2xl lg:!aspect-[7/7] overflow-hidden p-4"
        >
          <img
            draggable="false"
            class="h-full w-auto lg:h-[70%] group-hover:scale-[1.02] transition ease-in-out duration-[270ms]"
            alt="product"
            src={product.image}
          />
        </div>
      </div>
      <div class=" w-full h-full">
        <div class="w-full h-full px-4 relative grid place-items-start">
          <div class="block my-auto">
            <strong
              class="px-4 text-black mb-4 text-xl tracking-tight uppercase select-none bg-yellow-400 rounded-lg"
              >{product.category}
            </strong>
            <h2 class="text-white uppercase text-4xl lg:text-5xl font-black">
              {product.title}
            </h2>
            <h2
              class="text-green-500 uppercase text-4xl lg:text-5xl mt-3 mb-8 font-medium"
            >
              $ {product.price}
            </h2>
            <strong
              class="px-4 text-black my-4 text-2xl lg:text-3xl tracking-tight uppercase select-none bg-white rounded-lg font-semibold"
            >
              quantity
            </strong>
            <input
              type="number"
              max="10"
              min="1"
              name="number"
              on:input={(e) => {
                const newVal = parseInt(e.target.value);
                quantity.set(newVal);
              }}
              value={$quantity}
              class="rounded-xl text-2xl bg-white/10 px-2 md:px-4 py-0.5 md:py-1 text-center mx-2 text-white/95 focus:border-none select-none focus:ring-0"
            />
          </div>
          <button
            on:click={addProductToCart}
            class="mt-4 hover:scale-[1.02] transition ease-in-out lg:mt-1 bg-[#365de5] w-full tracking-tighter text-2xl uppercase select-none rounded-xl py-6 text-center font-bold"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
    {#if product.description}
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
          {product.description}
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
