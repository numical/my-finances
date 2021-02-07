<script>
  import { authStore } from '../stores';

  $: email = $authStore.email;
  $: id = $authStore.id;
  $: pwd = $authStore.pwd;
  $: pwdHash = $authStore.pwdHash;
  $: sessionId = $authStore.sessionId;
  $: state = $authStore.state;
</script>

<main>
  <h2>User state</h2>
  <table>
    <tr>
      <tc>email:</tc>
      <tc>{email}</tc>
    </tr>
    <tr>
      <tc>id:</tc>
      <tc>{id}</tc>
    </tr>
    <tr>
      <tc>password:</tc>
      <tc>{pwd}</tc>
    </tr>
    <tr>
      <tc>password hash:</tc>
      <tc>{pwdHash}</tc>
    </tr>
    <tr>
      <tc>session:</tc>
      <tc>{sessionId}</tc>
    </tr>
    <tr>
      <tc>state:</tc>
      <tc>{state}</tc>
    </tr>
  </table>
</main>

<style>
</style>
