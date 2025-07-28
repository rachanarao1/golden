// api/trigger-deploy.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { vm_type } = req.body;
  if (!vm_type) {
    return res.status(400).json({ error: 'vm_type is required' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = 'rachanarao1';  // your GitHub username/org
  const repo = 'golden-path';   // your repo name
  const workflow = 'deploy.yml'; // your workflow filename

  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ref: 'main',
      inputs: { vm_type }
    }),
  });

  if (response.status === 204) {
    res.status(200).json({ message: `Deployment triggered for ${vm_type}` });
  } else {
    const errorData = await response.json();
    res.status(response.status).json(errorData);
  }
}
