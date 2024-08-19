<script>
  import SearchBar from './components/SearchBar.svelte';
  import SearchResults from './components/SearchResults.svelte';
  import { searchCourses } from './lib/api';

  let query = '';
  let results = [];
  let totalHits = 0;
  let isLoading = false;
  let error = null;

  async function handleSearch() {
    isLoading = true;
    error = null;
    try {
      const searchResult = await searchCourses(query);
      results = searchResult.results;
      totalHits = searchResult.totalHits;
    } catch (e) {
      error = e.message;
    }
    isLoading = false;
  }
</script>

<main>
  <h1>LaserSA Course Search</h1>
  <SearchBar bind:query on:search={handleSearch} />
  {#if isLoading}
    <p class="loading">Loading...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <SearchResults {results} {totalHits} />
  {/if}
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  h1 {
    color: #00274C;
    text-align: center;
    margin-bottom: 2rem;
  }

  .loading, .error {
    text-align: center;
    font-size: 1.2rem;
    margin-top: 2rem;
  }

  .error {
    color: #e74c3c;
  }
</style>