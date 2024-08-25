<script>
  import { createEventDispatcher } from 'svelte';

  export let query = '';
  const dispatch = createEventDispatcher();

  function handleSubmit() {
    dispatch('search');
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input 
    type="text" 
    bind:value={query} 
    placeholder="Try words, phrases, titles, subjects, course ids, or instructors"
  />
</form>

<style>
  form {
    display: flex;
    margin-bottom: 20px;
  }
  input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>