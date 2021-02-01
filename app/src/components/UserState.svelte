<script>
  import { authStore } from '../stores/auth';

  $: userName = $authStore.userName;
  $: password = $authStore.currentPassword.value;
  $: passwordHash = $authStore.currentPassword.hash;
  $: status = $authStore.state.description;

</script>

<main>
  <h2>
    User state
  </h2>
  <table>
    <tr>
      <tc>name:</tc>
      <tc>{userName}</tc>
    </tr>
    <tr>
      <tc>password:</tc>
      <tc>{password}</tc>
    </tr>
    <tr>
      <tc>password hash:</tc>
      <tc>{passwordHash}</tc>
    <tr>
      <tc>status:</tc>
      <tc>{status}</tc>
    </tr>
  </table>
</main>

<style>

</style>
