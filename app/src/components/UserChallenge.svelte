<script>
  import { authStore } from '../stores/auth';

  const onClick = () => alert('Submitted');
</script>

<main>
  <h2>User challenge</h2>
  <label for='user-name'>Name:</label>
  <input id='user-name'>
  <label for='user-pwd'>Password:</label>
  <input id='user-pwd'>
  <div>
  <button on:click="{onClick}">Submit</button>
  </div>
</main>

<style>

</style>
