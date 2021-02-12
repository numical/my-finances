<script>
  import { authStore } from '../stores';

  let email = '';
  let pwd = '';

  const onClick = () => {
    authStore.setValue('email', email);
    authStore.setValue('pwd', pwd);
  };
</script>

<main>
  <h2>User challenge</h2>
  <label for="email">Email:</label>
  <input id="email" bind:value="{email}" />
  <label for="pwd">Password:</label>
  <input id="pwd" bind:value="{pwd}" />
  <div>
    <button on:click="{onClick}">Submit</button>
  </div>
</main>

<style>
</style>
