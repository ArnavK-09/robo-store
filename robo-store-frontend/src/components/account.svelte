<script>
  import { User } from "@/store/user";
  import Loading from "@/components/loading.svelte";
  import { onMount } from "svelte";

  let avatar = null;

  onMount(() => {
    if (!$User) {
      window.location.href = window.location.origin;
    }
    avatar = `https://cdn.discordapp.com/avatars/${$User.id}/${$User.avatar}?size=2048&dynamic=true`;
  });
</script>

<section
  id="profie"
  class="overflow-x-hidden w-screen h-screen grid place-items-center"
>
  {#if $User}
    <div class="w-full grid place-items-center overflow-x-hidden">
      <img
        href="/api/@me/avatar"
        alt="profile"
        class="block mx-auto rounded-full h-40 aspect-square lg:mb-4"
      />
      <div
        style={`background-image: url(/api/@me/avatar);background-size: contain;`}
        class="block mx-auto rounded-full bg-white/20 h-40 aspect-square lg:mb-4"
      ></div>
    </div>
    <form
      on:submit|preventDefault={() => {}}
      class="w-full md:w-[80%] mt-8 grid grid-cols-6 gap-6"
    >
      {#each Object.keys($User) as key}
        <div class="col-span-6">
          <label
            for={key}
            class="block uppercase text-sm font-normal text-gray-400 tracking-relaxed"
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
          href="/api/@me/logout"
          class="mt-4 px-5 lg:px-12 hover:scale-[1.02] transition ease-in-out lg:mt-1 bg-[#de2222] tracking-tighter text-lg md:text-xl lg:text-2xl uppercase select-none rounded-xl py-4 md:py-6 text-center font-bold"
        >
          LOGOUT
        </a>
      </div>
    </form>
  {:else}
    <Loading />
  {/if}
</section>
