<script>
  export let result;

  function getFirstLineOfDescription(desc) {
    if (typeof desc === 'string') {
      const lines = desc.split('\n').filter(line => line.trim() !== '');
      return lines[0] || '';
    }
    return '';
  }

  function formatRequirements(reqs) {
    if (Array.isArray(reqs)) {
      return reqs.join(', ');
    } else if (typeof reqs === 'string') {
      return reqs;
    }
    return 'No requirements specified.';
  }
</script>

<div class="result-item">
  <h3 class="course-title">{result.dept} {result.cnum}: {result.name}</h3>
  <div class="course-info">
    <span class="course-type">{result.stype}</span>
    <span class="course-credits">{result.creds} credits</span>
    <span class="course-semester">{result.sem}</span>
  </div>
  {#if result.instrs}
    <p class="instructor">Instructor: {result.instrs}</p>
  {/if}
  <p class="description">{getFirstLineOfDescription(result.desc?.gd)}</p>
  {#if result.reqs}
    <p class="requirements"><b>Requirements</b>: {formatRequirements(result.reqs)}</p>
  {/if}
</div>

<style>
/* todo */
</style>
