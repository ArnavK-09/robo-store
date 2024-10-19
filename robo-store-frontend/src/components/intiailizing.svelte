<script>
  import { isLoading } from "@/store/basics";
</script>

{#if $isLoading}
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
