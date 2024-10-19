<script>
  import { isHamburgerMenuOpen, storeDetails, cart } from "@/store/basics";
</script>

<nav
  class="select-none bg-transparent pt-4 overflow-x-hidden w-screen px-[16px] relative overflow-hidden"
>
  <div
    class="h-[64px] border-black border-2 bg-[#1a1a1a]/95 backdrop-blur-lg flex gap-3 items-center align-middle justify-between rounded-lg px-4 py-2"
  >
    <div>
      <a
        href="/"
        class="logo-text whitespace-nowrap tracking-tighter text-3xl uppercase"
        >{$storeDetails.store_name}</a
      >
    </div>
    <div
      class="w-[80%] hidden lg:grid place-items-center relative h-[32px] rounded-2xl bg-[#313131] overflow-hidden px-3 py-1.5"
    >
      <div
        style={`animation: marquee ${$storeDetails.slogan.length}s infinite linear;`}
        class="gap-4 inline-flex animate-[marquee_15s_infinite_linear] items-center justify-center align-middle"
      >
        {#each new Array(50).fill(0) as _}
          <div
            class="!whitespace-nowrap !text-xs font-normal uppercase tracking-tighter mx-0 w-full"
          >
            {$storeDetails.slogan}
          </div>
        {/each}
      </div>
    </div>
    <div>
      <div class="flex gap-0">
        <a href="/cart">
          <div
            class="relative border-x-2 border-black h-[64px] grid place-items-center aspect-square"
          >
            <span
              class="bg-red-700 absolute top-2 right-2 rounded-full px-1 aspect-square font-semibold text-xs text-white"
              >{$cart.length ?? 0}</span
            >
            <svg
              class="h-[30px] !stroke-white/90 aspect-square"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              ><g fill="none" stroke-width="1.5"
                ><path
                  d="M3.864 16.455c-.858-3.432-1.287-5.147-.386-6.301S6.148 9 9.685 9h4.63c3.538 0 5.306 0 6.207 1.154s.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91Z"
                /><path
                  d="m19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0 0 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5l.71-2.605c.274-1.005.411-1.507.692-1.886A2.5 2.5 0 0 1 7 4.172C7.44 4 7.96 4 9 4"
                /><path
                  d="M9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z"
                /></g
              ></svg
            >
          </div>
        </a>
        <button on:click={() => isHamburgerMenuOpen.set(!$isHamburgerMenuOpen)}>
          <div
            class="border-r-2 border-black h-[64px] grid place-items-center aspect-square"
          >
            <div class="space-y-2 block">
              <span
                class={`block h-0.5 w-8 origin-center rounded-full bg-white/90 duration-200 transition-transform ease-in-out ${$isHamburgerMenuOpen ? "translate-y-1.5 rotate-45 !h-1" : ""}`}
              ></span>
              <span
                class={`block h-0.5 origin-center rounded-full bg-white/85 duration-200 transition-transform ease-in-out ${$isHamburgerMenuOpen ? "w-8 -translate-y-1.5 -rotate-45 !h-1" : "w-6"}`}
              ></span>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</nav>
