<script>
  import SearchBar from './components/SearchBar.svelte';
  import SearchResults from './components/SearchResults.svelte';
  import SearchTips from './components/SearchTips.svelte';
  import { searchCourses } from './lib/api';

  let query = '';
  let results = [];
  let totalHits = 0;
  let isLoading = false;
  let error = null;
  let searchTime = 0;

  async function handleSearch() {
    isLoading = true;
    error = null;
    try {
      const searchResult = await searchCourses(query);
      results = searchResult.results;
      totalHits = searchResult.totalHits;
      searchTime = searchResult.timeToQuery / 1000000;
    } catch (e) {
      error = e.message;
    }
    isLoading = false;
  }

  function handleSelectQuery(event) {
    query = event.detail;
    handleSearch();
  }
</script>

<main>
  <div class="header">
    <h1>lasersa</h1>
    <pre>fastest course search in the midwest</pre>
    <div class="searchbar-wrapper">
      <svg class="search-icon" viewBox="0 0 50 50">
        <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
      </svg>
      <SearchBar bind:query on:search={handleSearch} />
    </div>
    <SearchTips on:selectQuery={handleSelectQuery} />
  </div>
  
  <div class="content">
    {#if isLoading}
      <p class="loading">Loading...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else if results.length > 0}
      <p class="results-summary">
        Found {totalHits} results
        <span class="search-time">({searchTime.toFixed(2)} ms)</span>
      </p>
      <SearchResults {results} />
    {/if}
  </div>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .header {
    top: 0;
    background-color: #f6f5f0;
    padding: 1rem 0;
    z-index: 10;
  }

  h1 {
    color: #084ccf;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  pre {
    text-align: center;
    margin-bottom: 1rem;
  }

  .searchbar-wrapper {
    position: relative;
    max-width: 600px;
    margin: 0 auto 1rem;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    fill: #6b7280;
    pointer-events: none;
  }

  :global(.searchbar-wrapper input) {
    padding: 10px 10px 10px 40px;
    border: none;
    background-color: #f9fafb;
    font-size: 1.1rem;
    width: 100%;
    border-radius: 4px;
  }

  :global(.searchbar-wrapper input:hover) {
    background-color: #e6f3ff;
  }

  :global(.searchbar-wrapper input:focus) {
    outline: none;
    box-shadow: 0 0 0 2px rgba(8, 76, 207, 0.2);
  }

  .content {
    margin-top: 1rem;
  }

  .loading, .error {
    text-align: center;
    font-size: 1.2rem;
    margin-top: 2rem;
  }

  .error {
    color: #e74c3c;
  }

  .results-summary {
    font-size: 0.875rem;
    background-color: #e6ffec;
    padding: 0.25rem 0.5rem;
    border: 1px solid #34d399;
    display: inline-block;
    border-radius: 4px;
  }

  .search-time {
    color: #6b7280;
  }
</style>