<script>
  // form data
  let form = {
    email: "a@aa.com",
    password: "",
    old_password: "",
  };

  /**
   * update user data
   */
  function update_user_data() {}
</script>

<section id="profie" class="px-5 md:px-36">
  <form
    on:submit|preventDefault={update_user_data}
    class="mt-8 grid grid-cols-6 gap-6"
  >
    <div class="col-span-6">
      <label
        for="Email"
        class="block text-sm font-normal text-gray-400 tracking-relaxed"
      >
        Email
      </label>

      <input
        bind:value={form.email}
        type="email"
        readonly
        id="Email"
        name="email"
        required
        class="mt-1 w-full rounded-md border-gray-200 bg-transparent focus:bg-white/5 text-sm text-white shadow-sm focus:ring-2 focus:outline-none focus:border-none focus:ring-gray-200"
      />
    </div>

    <div class="col-span-6">
      <label
        for="Password"
        class="block text-sm font-normal text-gray-400 tracking-relaxed"
      >
        New Password
      </label>

      <input
        bind:value={form.password}
        type="password"
        required
        minlength="8"
        maxlength="30"
        id="Password"
        name="password"
        class="mt-1 w-full rounded-md border-gray-200 bg-transparent focus:bg-white/5 text-sm text-white shadow-sm focus:ring-2 focus:outline-none focus:border-none focus:ring-gray-200"
      />
    </div>

    {#if form.password.length > 0}
      <div class="col-span-6">
        <label
          for="Password"
          class="block text-sm font-normal text-gray-400 tracking-relaxed"
        >
          Confirm Old Password
        </label>

        <input
          bind:value={form.old_password}
          type="password"
          required
          minlength="8"
          maxlength="30"
          id="Password"
          name="password"
          class="mt-1 w-full rounded-md border-gray-200 bg-transparent focus:bg-white/5 text-sm text-white shadow-sm focus:ring-2 focus:outline-none focus:border-none focus:ring-gray-200"
        />
      </div>
    {/if}

    <div class="col-span-6 text-center grid place-items-center">
      <button
        class="inline-block shrink-0 rounded-md border border-white bg-white/90 px-12 py-3 text-sm font-medium text-black transition hover:bg-transparent hover:text-white focus:outline-none focus:ring"
      >
        Update Your Account
      </button>
    </div>
  </form>
</section>
