<script>
  import { authStore } from '../stores/auth';

  let userName = "";
  let pwd = ""

  const onClick = () => {
    authStore.update(state => ({
      ...state,
      userName,
      currentPassword: {
        ...state.currentPassword,
        value: pwd
      }
    }));
  };

</script>

<main>
  <h2>User challenge</h2>
  <label for='user-name'>Name:</label>
  <input id='user-name' bind:value={userName}>
  <label for='user-pwd'>Password:</label>
  <input id='user-pwd' bind:value={pwd}>
  <div>
  <button on:click="{onClick}">Submit</button>
  </div>
</main>

<style>

</style>
