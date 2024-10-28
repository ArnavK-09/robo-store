<script lang="ts">
  import { User } from "@/store/user";
  import Loading from "@/components/loading.svelte";
  import { onMount } from "svelte";
  import { cart as cartItems, storeDetails } from "@/store/basics";

  let total_price = 0;
  let final_price = 0;
  let isLoading = false;
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

  onMount(() => {
    if (!$User) {
      window.location.href = window.location.origin;
    }
  });

  const continueOrder = async () => {
    isLoading = true;
    const res = await fetch("/api/@me/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: $cartItems,
      }),
    })
      .then(() => {
        cartItems.set([]);
        localStorage.setItem("cartItems", `[]`);
        window.location.replace("/?order-created");
      })
      .catch((e) => {
        console.error(e);
        alert(e.message);
      })
      .finally(() => {
        isLoading = false;
      });
  };
</script>

<section
  id="checkout"
  class="overflow-x-hidden w-screen h-screen grid place-items-center"
>
  {#if $User && !isLoading}
    <div
      class="select-none h-[70%] w-full break-words flex flex-col gap-4 text-center"
    >
      <h2 class="text-5xl font-bold tracking-wide text-white">
        {$storeDetails.currency_symbol}{final_price}
      </h2>
      <h2
        class="text-4xl font-medium tracking-tight text-white/80 line-through"
      >
        {$storeDetails.currency_symbol}{total_price}
      </h2>
      <button
        on:click={continueOrder}
        disabled={$cartItems.length == 0 || !$User}
        class="mt-6 text-center inline-block w-auto break-all md:w-1/2 mx-auto shrink-0 rounded-md border border-white bg-white/90 px-12 py-3 text-md font-bold text-[#1a1a1a] transition hover:bg-transparent hover:text-white focus:outline-none ring-0 disabled:opacity-60 focus:ring-0"
      >
        {#if $User}
          Checkout {$cartItems.length} Item{$cartItems.length > 1 ? "s" : ""}
        {:else}
          Login To Continue
        {/if}
      </button>
    </div>
  {:else}
    <Loading />
  {/if}
</section>
