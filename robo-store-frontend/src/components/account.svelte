<script>
  import { User } from "@/store/user";
  import Loading from "@/components/loading.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    if (!$User) {
      // window.location.href = window.location.origin;
    }
  });
</script>

<section
  id="profie"
  class="overflow-x-hidden w-screen h-screen grid place-items-center"
>
  {#if $User}
    <form
      on:submit|preventDefault={() => {}}
      class="mt-8 grid grid-cols-6 gap-6"
    >
      {#each $User.keys as key}
        <div class="col-span-6">
          <label
            for={key}
            class="block text-sm font-normal text-gray-400 tracking-relaxed"
          >
            {key}
          </label>

          <input
            type="text"
            readonly
            id={key}
            name={key}
            required
            value={$User[key]}
            class="mt-1 w-full rounded-md border-gray-200 bg-transparent focus:bg-white/5 text-sm text-white shadow-sm focus:ring-2 focus:outline-none focus:border-none focus:ring-gray-200"
          />
        </div>
      {/each}
      <div class="col-span-6 text-center grid place-items-center">
        <a
          href="/api/logout"
          class="inline-block shrink-0 rounded-md border border-white bg-white/90 px-12 py-3 text-sm font-medium text-black transition hover:bg-transparent hover:text-white focus:outline-none focus:ring"
        >
          LOGOUT
        </a>
      </div>
      <div class="col-span-6 text-center grid place-items-center">
        <a
          href="/api/@me/logout"
          class="mt-4 px-12 hover:scale-[1.02] transition ease-in-out lg:mt-1 bg-[#de2222] w-full tracking-tighter text-2xl uppercase select-none rounded-xl py-6 text-center font-bold"
        >
          LOGOUT
        </a>
      </div>
    </form>
  {:else}
    <Loading />
  {/if}
</section>
