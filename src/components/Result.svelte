<script>
  export let result;

  function formatRequirements(reqs) {
    if (Array.isArray(reqs)) {
      return reqs.join(', ');
    } else if (typeof reqs === 'string') {
      return reqs;
    }
    return 'No requirements specified.';
  }

  function getFullCourseName(result) {
    return `${result.dept} ${result.cnum}: ${result.name}`;
  }

</script>

<div class="course-card">
  <div class="course-header">
    <h3>{getFullCourseName(result)}</h3>
    <span class="course-sem">{result.sem}</span>
  </div>
  <div class="course-meta">
    <span class="meta-item">{result.stype} {result.creds} credits</span>
    {#if result.reqs}
      <span class="meta-item">{formatRequirements(result.reqs)}</span>
    {/if}
  </div>
  <!-- console log  -->
  {#if result['desc.gd']}
  <div class="course-description">
    <p>{result['desc.gd']}</p>
  </div>
  {/if}
  <div class="course-details">
    {#if result.instrs}
      <div class="detail-group">
        <h4>Instructor{result.instrs.includes(',') ? 's' : ''}</h4>
        <p>{result.instrs}</p>
      </div>
    {/if}
  {#if result['desc.advreq'] || result['desc.enfreq']}
  <div class="detail-group">
    <h4>Prerequisites:</h4>
    {#if result['desc.advreq']}
      <p><strong>Advisory -</strong> {result['desc.advreq']}</p>
    {/if}
    {#if result['desc.enfreq']}
      <p><strong>Enforced -</strong> {result['desc.enfreq']}</p>
    {/if}
  </div>
{/if}
  </div>
</div>

<style>
  .course-card {
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
  }
  .course-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .course-sem {
    color: #666;
    font-weight: 600;
  }
  .course-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .meta-item {
    background-color: #e0e0e0;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  .course-description {
    margin-bottom: 15px;
  }
  .course-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  .detail-group h4 {
    margin-top: 0;
    margin-bottom: 5px;
    color: #555;
  }
  .detail-group p {
    margin: 0;
  }
</style>