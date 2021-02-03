<script>
  export let name;
  export let description;
  export let fn;

  $: result = 'not yet clicked';
  $: colour = 'black';

  const onClick = async () => {
    try {
      result = JSON.stringify(await fn());
      colour = 'black';
    } catch (err) {
      result = err.message;
      colour = 'red';
    }
  };
</script>

<main>
  <h2>{name}</h2>
  <p>{description}</p>
  <button on:click="{onClick}">Fire</button>
  <div style="{`color: ${colour}`}">{result}</div>
</main>

<style>
</style>
