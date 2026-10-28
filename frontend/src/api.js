async function request(path, options = {}) {
  const res = await fetch(path, options)
  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data.message) message = data.message
    } catch {
      // response had no JSON body, keep the default message
    }
    throw new Error(message)
  }
  return res.json()
}

export const api = {
  products: ({ category, search } = {}) => {
    const query = new URLSearchParams()
    if (category) query.set('category', category)
    if (search) query.set('search', search)
    const qs = query.toString()
    return request(`/api/products${qs ? `?${qs}` : ''}`)
  },
  product: (id) => request(`/api/products/${id}`),
  categories: () => request('/api/categories'),
  placeOrder: (payload) =>
    request('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  trackOrder: (orderNumber) => request(`/api/orders/${encodeURIComponent(orderNumber)}`),
}
