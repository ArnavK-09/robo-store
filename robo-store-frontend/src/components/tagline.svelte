<script>
  import { storeDetails } from "@/store/basics";
</script>

<section
  id="tagline"
  class="w-[96vw] text-center block mx-auto relative h-[48px] rounded-2xl bg-white overflow-hidden px-3 py-1.5"
>
  <div
    class="h-full animate-marquee flex gap-4 items-center justify-center align-middle"
  >
    {#each new Array(50).fill(0) as x}
      <div
        class="select-none whitespace-nowrap text-black !text-xl font-bold uppercase tracking-tighter mx-0"
      >
        {$storeDetails.slogan}
      </div>
    {/each}
  </div>
</section>
