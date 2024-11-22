<script lang="ts">
  import { storeDetails, storeProducts } from "@/store/basics";
  import Loading from "@/components/loading.svelte";

  let allOptions = ["all", ...($storeDetails?.categories ?? undefined)].filter(
    (x) => !!x,
  );
  let selectedOption: allOptions = allOptions[0];

  let filteredProducts = $storeProducts;

  $: {
    allOptions = ["all", ...($storeDetails?.categories ?? undefined)].filter(
      (x) => !!x,
    );
    filteredProducts = $storeProducts.filter((x) => {
      if (selectedOption.toLowerCase() === "all") return true;
      return x.category.toLowerCase() == selectedOption.toLowerCase();
    });
  }
</script>

<div class="overflow-x-hidden w-screen px-4">
  <div class="select-none">
    <h2 class="tracking-tight font-bold text-4xl md:text-5xl lg:text-6xl">
      SHOP ({$storeProducts.length})
    </h2>
    <div class="mt-4 flex gap-4 flex-wrap break-words">
      {#each allOptions as x}
        {@const isSelected = selectedOption.toLowerCase() == x.toLowerCase()}
        <button on:click={() => (selectedOption = x)}>
          <strong
            class={`uppercase tracking-tighter duration-[300ms] text-xl md:text-3xl font-medium transition ease-in-out cursor-pointer ${isSelected ? "text-green-600 hover:text-green-500" : "hover:text-green-600 text-white/30"}`}
            >{x}</strong
          >
        </button>
      {/each}
    </div>
    <section
      class="gap-4 h-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {#if $storeProducts.length == 0}
        <Loading />
      {/if}
      {#if filteredProducts.length == 0 && $storeProducts.length !== 0}
        <div
          class="h-full grid place-items-center text-center w-full select-none"
        >
          <strong class="break-words text-white/80 text-xl"
            >( No Products )
          </strong>
        </div>
      {/if}
      {#each filteredProducts as product (product._id)}
        {@const finalPrice = Math.round(
          product.price - (product.discount * product.price) / 100,
        )}
        <a href={`/product?id=${product._id}`}
          ><div
            class="select-none !relative pb-4 rounded-xl h-full w-full block group cursor-pointer transition ease-in-out duration-[250ms] hover:brightness-110"
          >
            <div
              class="!aspect-[7/7] p-4 w-full rounded-xl bg-white/10 group-hover:bg-white/[0.11] overflow-hidden"
            >
              <img
                draggable="false"
                class="h-full group-hover:scale-[1.02] rounded-xl transition ease-in-out duration-[270ms] w-full"
                alt="product"
                src={product.image}
              />
            </div>
            {#if product.discount !== 0}
              <span
                class="font-black tracking-tighter uppercase py-0.5 px-1.5 absolute top-0 rounded-tr-xl right-0 bg-red-700 text-xs"
                >FLAT {product.discount}% OFF</span
              >
            {/if}
            <div class="w-full bottom-0 flex flex-col mt-2 px-2 break-all">
              <strong
                class="break-all text-lg md:text-xl tracking-tight uppercase font-normal"
                >{product.title}</strong
              >
              <strong class="font-bold text-green-500 text-md md:text-lg"
                >{$storeDetails.currency_symbol}{finalPrice}
                {#if finalPrice !== product.price}
                  <span
                    class="text-xs font-thin ml-1 line-through text-white/40 tracking-normal"
                    >{$storeDetails.currency_symbol}{product.price}</span
                  >
                {/if}
              </strong>
            </div>
          </div></a
        >
      {/each}
    </section>
  </div>
</div>
