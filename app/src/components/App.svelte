<script>
  import APICaller from './APICaller.svelte';
  import { createSession, createUser, getFinancialModel, getUser } from '../fetch';
  import UserChallenge from './UserChallenge.svelte';
  import UserState from './UserState.svelte';
</script>

<main>
  <h1>Auth Model Spike</h1>
  <UserState />
  <UserChallenge />
  <APICaller
    name="Create user"
    description="POST /user"
    fn="{createUser}" />
  <APICaller
    name="Create session"
    description="POST /session"
    fn="{createSession}"
  />
  <APICaller
    name="Fetch user"
    description="GET /user"
    fn="{getUser}" />
  <APICaller
    name="Fetch model"
    description="GET /financial-model"
    fn="{getFinancialModel}"
  />
</main>

<style>
</style>
