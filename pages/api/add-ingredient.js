// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.data;
    res.status(200).json({ name: 'John Doe' });
  }
}

// to call from component await fetch('./api/add-ingredient', {method: 'POST', body: {name: 'John Doe'}, headers etc...})
// await response.json()