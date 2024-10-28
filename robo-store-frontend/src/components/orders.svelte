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

  /**
  
{
  "_id": "671fd225c516bc59ccc2e8b9",
  "buyer": "739454321661313025",
  "payment_done": false,
  "totalAmount": 138,
  "finalAmount": 14,
  "status": "pending",
  "products": [
    {
      "product": "671372903bbe7abcff5ad76f",
      "quantity": 2,
      "_id": "671fd225c516bc59ccc2e8ba",
    },
  ],
  "primary_id": "Na4VeaUQ",
  "orderedAt": "2024-10-28T18:04:21.228Z",
  "__v": 0,
}
Array^^^

 */
</script>

<pre>
    {JSON.stringify($userOrders)}
</pre>
