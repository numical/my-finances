<script>
  import APICaller from './APICaller.svelte';
  import getUser from '../fetch/getUser';
  import getFinancialModel from '../fetch/getFinancialModel';
  import createSesson from '../fetch/createSesson';
  import UserChallenge from './UserChallenge.svelte';
  import UserState from './UserState.svelte';
</script>

<main>
  <h1>Auth Model Spike</h1>
  <UserState />
  <UserChallenge />
  <APICaller
    name="Create session"
    description="POST /session"
    fn="{createSesson}"
  />
  <APICaller name="Fetch user" description="GET /user" fn="{getUser}" />
  <APICaller
    name="Fetch model"
    description="GET /financial-model"
    fn="{getFinancialModel}"
  />
</main>

<style>
</style>
