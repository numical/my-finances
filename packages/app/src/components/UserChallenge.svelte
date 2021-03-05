<script>
  import { authStore } from '../stores';
  import { hash } from '../browser-functions';

  let email = '';
  let pwd = '';

  const onClick = async() => {
    const [emailHash, pwdHash] = await Promise.all([
      hash(email),
      hash(email, pwd),
    ]);
    authStore.setValues({
      email,
      emailHash,
      pwd,
      pwdHash
    });
  };
</script>

<main>
  <h2>User challenge</h2>
  <label for="email" placeholder="test@test.com">Email:</label>
  <input id="email" bind:value="{email}" />
  <label for="pwd">Password:</label>
  <input id="pwd" bind:value="{pwd}" />
  <div>
    <button on:click="{onClick}">Submit</button>
  </div>
</main>

<style>
</style>
