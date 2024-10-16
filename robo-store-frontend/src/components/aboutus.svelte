<script>
  import { storeDetails } from "@/store/basics";
</script>

<section class="overflow-x-hidden w-screen px-4 pt-20">
  <div class="flex flex-col gap-10">
    <div class="mb-10">
      <h2
        class="select-none mb-10 tracking-tight text-center font-bold text-4xl md:text-5xl lg:text-6xl"
      >
        ABOUT US
      </h2>
    </div>
    <div
      class="px-5 text-white/80 text-md mt-10 md:text-xl leading-tight font-thin break-words"
    >
      {$storeDetails.about_us ?? $storeDetails.introduction}
    </div>
  </div>
</section>
