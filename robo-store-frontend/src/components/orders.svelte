<script lang="ts">
  import { User } from "@/store/user";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  const userOrders = writable([]);

  onMount(async () => {
    if (!$User) {
      window.location.href = window.location.origin;
    }
    const response = await fetch("/api/@me/orders");
    if (response.ok) {
      const data = await response.json();
      console.log(34, data);
      userOrders.set(data);
    } else {
      alert("Internal Error");
      window.location.replace(`?error`);
    }
  });
</script>

<pre>
    <div
    class="flex h-auto items-center w-[98vw] justify-center brightness-110">
      <div class="px-2 overflow-scroll">
    <table class="w-full min-w-max table-auto text-center">
      <thead>
        <tr>
          <th class="border-y p-4">
            <p
                class="block antialiased font-sans text-sm font-normal leading-none opacity-70">ID</p>
          </th>
          <th class="border-y p-4">
            <p
                class="block antialiased font-sans text-sm font-normal leading-none opacity-70">Total Amount</p>
          </th>
          <th class="border-y p-4">
            <p
                class="block antialiased font-sans text-sm font-normal leading-none opacity-70">Discounted Amount</p>
          </th>
          <th class="border-y p-4">
            <p
                class="block antialiased font-sans text-sm font-normal leading-none opacity-70">Status</p>
          </th>
          <th class="border-y p-4">
            <p
                class="block antialiased font-sans text-sm font-normal leading-none opacity-70">Ordered At</p>
          </th> <th class="border-y p-4">
            <p
                class="block antialiased font-sans text-sm font-normal leading-none opacity-70">Product IDs</p>
          </th>
        </tr>
      </thead>
      <tbody>

    {#each $userOrders as order (order._id)}
            <tr>
          <td class="p-4 border-b">
              <p
                  class="block antialiased font-sans text-sm leading-normal font-bold">{order.primary_id}</p>
        
          </td>
          <td class="p-4 border-b">
            <p
                  class="block antialiased font-sans text-sm leading-normal font-normal">${order.totalAmount}</p>
          </td>
          <td class="p-4 border-b">
            <p
                  class="block antialiased font-sans text-sm leading-normal font-normal">{order.finalAmount}</p>
          </td>
          <td class="p-4 border-b">
            <div class="w-max">
              <div
                    class={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md 
                ${order.status === "pending" ? "bg-yellow-500/20 text-yellow-900" : ""}
                ${order.status === "shipped" ? "bg-blue-500/20 text-blue-900" : ""}
                ${order.status === "delivered" ? "bg-green-500/20 text-green-900" : ""}
                ${order.status === "canceled" ? "bg-red-500/20 text-red-900" : ""}`}>
                <span>{order.status}</span>
              </div>
            </div>
          </td>
          <td class="p-4 border-b">
            <div class="w-max">
              <div
                    class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-white/20 text-white py-1 px-2 text-xs rounded-md"
                    style="opacity: 1;">
                <span
                      >{new Date(
                        `${order.orderedAt}`,
                      ).toLocaleDateString()}</span
                    >
              </div>
            </div>
          </td>
          <td class="p-4 border-b">
            <p
                  class="block antialiased font-sans text-sm leading-normal font-bold">{order.products
                    .map(
                      (product) => `(${product.quantity}) ${product.product}`,
                    )
                    .join(",")}</p>
      
        </td>
        </tr>
          {/each}
      </tbody>
    </table>
    </div>

</div></pre>
