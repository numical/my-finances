<script>
  export let name;
  export let description;
  export let fn;

  $: result = 'not yet clicked';

  const onClick = async() => {
    result = await fn();
  }

</script>

<main>
    <h2>{name}</h2>
    <p>{description}</p>
    <button on:click="{onClick}">Fire</button>
    <div>{result}</div>
</main>

<style>
    main {

    }
</style>