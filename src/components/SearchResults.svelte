<script>
  import ResultItem from './Result.svelte';
  export let results = [];
</script>

<div class="search-results">
  {#if results.length === 0}
    <p class="no-results">No results found.</p>
  {:else}
    <div class="results-grid">
      {#each results as result}
        <ResultItem {result} />
      {/each}
    </div>
  {/if}
</div>

<style>

</style>