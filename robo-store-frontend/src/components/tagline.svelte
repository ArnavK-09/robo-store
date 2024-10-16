<script>
  import { storeDetails } from "@/store/basics";
</script>

<div class="h-full flex gap-4 items-center justify-center align-middle">
  {#each new Array(50).fill(0) as x}
    <div
      class="animate-marquee select-none whitespace-nowrap text-black !text-xl font-bold uppercase tracking-tighter mx-0 w-full"
    >
      {$storeDetails.slogan}
    </div>
  {/each}
</div>
