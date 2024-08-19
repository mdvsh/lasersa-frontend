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
    placeholder="Search for courses..."
  />
  <button type="submit">Search</button>
</form>

<style>
  form {
    display: flex;
    margin-bottom: 20px;
  }
  input {
    flex-grow: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #00274C;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
</style>