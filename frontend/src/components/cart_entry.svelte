<script lang="ts">
    export let name: string;
    export let image: string;
    export let quantity: number;
    export let price: number;
</script>

<div class="flex items-center mb-4 select-none">
    <img
        class="h-auto w-16 object-contain rounded-lg mr-4"
        src={image}
        alt="Product"
        draggable="false"
        oncontextmenu="return false"
    />
    <div class="flex-1">
        <h2 class="text-lg font-bold">{name}</h2>
        <span class="text-white/90">${price}</span>
    </div>
    <div
        class="scale-80 md:scale-100 flex items-center justify-center text-center align-center"
    >
        <button class="text-white/90 text-3xl hover:text-white">
            &plus;
        </button>
        <input
            type="number"
            max="10"
            min="1"
            name="number"
            on:input={(e) => {
                const newVal = parseInt(e.target.value);
                quantity.set(newVal)
            }}
            value={$quantity}
            class="rounded-3xl bg-zinc-900 px-2 md:px-4 py-0.5 md:py-1 w-10 md:w-16 text-center mx-2 text-white/95 focus:border-none select-none focus:ring-0"
        />
        <button class="text-white/90 text-3xl hover:text-white">
            &minus;
        </button>
    </div>
</div>