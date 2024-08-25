export function parseQuery(query) {
  const params = {
    q: [],
    dept: [],
    cnum: [],
    name: [],
    sem: [],
    stype: [],
    snum: [],
    stitle: [],
    im: [],
    creds: [],
    instrs: [],
    reqs: []
  };

  const regex = /@(\w+):(?:"([^"]+)"|(\S+))|\S+/g;
  let match;

  while ((match = regex.exec(query)) !== null) {
    if (match[1]) { // Field-specific search
      const field = match[1];
      const value = match[2] || match[3];
      
      if (field === 'cnum' && value.includes('..')) {
        const [start, end] = value.split('..').map(Number);
        for (let i = start; i <= end; i++) {
          params[field].push(i);
        }
      } else if (value.includes(',')) {
        params[field].push(...value.split(','));
      } else {
        params[field].push(value);
      }
    } else { // General search term
      params.q.push(match[0]);
    }
  }

  params.q = params.q.join(' ');

  return params;
}