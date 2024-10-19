<script>
  import { storeDetails } from "@/store/basics";
</script>

{#if $storeDetails.hero_image}
  <section
    class="bg-origin-border select-none mt-1 mb-5 bg-repeat bg-cover w-[96vw] md:aspect-[16/7] aspect-[2/1] block mx-auto rounded-xl"
    style={`background-image: url(${$storeDetails.hero_image});`}
    id="hero"
  ></section>
{/if}
