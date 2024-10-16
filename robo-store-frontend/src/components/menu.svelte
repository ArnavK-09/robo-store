<script>
  import { isHamburgerMenuOpen } from "@/store/basics";
  import { User } from "@/store/user";
</script>

{#if $isHamburgerMenuOpen}
  <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
  <section
    on:click={() => isHamburgerMenuOpen.set(false)}
    class="animate-opaque_show px-0 duration-200 transition-all ease-in-out pt-[100px] w-screen h-screen overflow-hidden fixed top-0 left-0 !z-[400] bg-white/[0.02] backdrop-blur-sm"
  >
    <div
      class="w-[95%] md:w-1/2 lg:w-1/3 animate-menu_show block mx-auto md:absolute md:right-5 h-auto bg-[#1a1a1a] rounded-xl p-2 border-black border-2"
    >
      <div class="w-full grid grid-cols-2 gap-1">
        {#each ["Home", "Store", "About", "Contact"] as x}
          <a
            href={`/${x.toLowerCase()}`}
            class="select-none tracking-tight w-full m-0 px-2 uppercase bg-white grid place-items-center text-xl overflow-hidden font-bold text-black text-left rounded-sm"
          >
            {x}
          </a>
        {/each}
      </div>
      {#if $User}
        <a
          href={`/me`}
          class="select-none w-full mt-4 px-2 bg-gradient-to-br from-blue-600 to-blue-700 grid place-items-center text-2xl overflow-hidden font-black text-white text-center rounded-sm"
        >
          @{$User.username}
        </a>
      {:else}
        <a
          href={`/api/login`}
          class="select-none w-full mt-4 px-2 uppercase bg-gradient-to-br from-blue-600 to-blue-700 grid place-items-center text-2xl overflow-hidden font-black text-white text-center rounded-sm"
        >
          Login
        </a>
      {/if}
    </div>
  </section>
{/if}
