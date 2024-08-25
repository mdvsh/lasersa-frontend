<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const sampleQueries = [
    { query: '@instrs:paoletti', description: 'Find by instructor' },
    { query: 'meaning of life ?', description: 'Semantic search'},
    { query: '@dept:english,econ @reqs:ulwr,hu', description: 'Meet your requirements, your style' },
    { query: '@sem:wn 2024 mythology', description: 'Find specific sem offerings' },
    { query: '@dept:physics @cnum:200..400', description: 'Run complex queries, find your match' },
  ];

  function handleClick(query) {
    dispatch('selectQuery', query);
  }
</script>

<div class="search-tips">
  <p>... or try these sample queries:</p>
  <div class="sample-queries">
    {#each sampleQueries as { query, description }}
      <button on:click={() => handleClick(query)} class="query-chip">
        <span class="query">{query}</span>
        <span class="description">{description}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .search-tips {
    margin-top: 1rem;
    text-align: center;
  }

  p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #666;
  }

  .sample-queries {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .query-chip {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .query-chip:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }

  .query {
    font-weight: bold;
    font-size: 0.8rem;
    color: #4a4a4a;
  }

  .description {
    font-size: 0.7rem;
    color: #888;
    margin-top: 0.2rem;
  }
</style>