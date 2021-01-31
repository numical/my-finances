<script>
  import APICaller from './APICaller.svelte';
  import getUser from '../fetch/getUser';
  import getFinancialModel from '../fetch/getFinancialModel';
  import createSesson from '../fetch/createSesson';
</script>

<main>
  <h1>Auth Model Spike</h1>
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
