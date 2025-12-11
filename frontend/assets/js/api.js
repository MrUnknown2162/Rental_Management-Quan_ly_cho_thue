const api = (() => {
  const base = () => (typeof CONFIG !== 'undefined' ? CONFIG.API_BASE : 'http://localhost:8000');

  async function request(path, opts = {}) {
    const headers = opts.headers || {};
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (opts.body && !(opts.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(opts.body);
    }
    const res = await fetch(base() + path, { headers, ...opts });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      let err = { status: res.status, message: res.statusText };
      try { err = { ...err, ...(JSON.parse(text) || {}) }; } catch {}
      throw err;
    }
    // try parse json, otherwise return text
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return res.json();
    return res.text();
  }

  return {
    fetchAssets: async ({ q = '', status = '' } = {}) =>
      request(`/assets?q=${encodeURIComponent(q)}&status=${encodeURIComponent(status)}`),
    fetchAssetById: (id) => request(`/assets/${id}`),
    login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
    register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
    // placeholder for rent
    rentAsset: (id, payload = {}) => request(`/assets/${id}/rent`, { method: 'POST', body: payload })
  };
})();
