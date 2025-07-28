let selectedAssets = {
  Infrastructure: null
  // Application: null,
  // Monitoring: null
};

window.onload = function () {
  fetch('assets/catalog.json')
    .then(response => response.json())
    .then(data => renderDropdowns(data))
    .catch(error => console.error('Error loading catalog:', error));
};

function renderDropdowns(assets) {
  const infraSelect = document.getElementById('infrastructure-select');
  // const appSelect = document.getElementById('application-select');
  // const monitorSelect = document.getElementById('monitoring-select');

  infraSelect.length = 1;
  // appSelect.length = 1;
  // monitorSelect.length = 1;

  assets.forEach(asset => {
    const option = document.createElement('option');
    option.value = asset.id;
    option.textContent = asset.name;

    if (asset.category === "Infrastructure") infraSelect.appendChild(option);
    // if (asset.category === "Application") appSelect.appendChild(option);
    // if (asset.category === "Monitoring") monitorSelect.appendChild(option);
  });

  infraSelect.onchange = () => selectedAssets.Infrastructure = infraSelect.value;
  // appSelect.onchange = () => selectedAssets.Application = appSelect.value;
  // monitorSelect.onchange = () => selectedAssets.Monitoring = monitorSelect.value;
}

function triggerDeployment() {
  const selected = Object.values(selectedAssets).filter(Boolean);

  if (selected.length < 1) {
    alert("Please select a Virtual Machine before deploying.");
    return;
  }

  // Simulate REST API trigger
  alert("Selected Modules:\n" + JSON.stringify(selectedAssets, null, 2));

  // Example: call REST API endpoint
  // fetch('https://api.example.com/deploy', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(selectedAssets)
  // })
  // .then(res => res.json())
  // .then(data => alert("Deployment started: " + JSON.stringify(data)))
  // .catch(err => console.error("Deployment error:", err));
}
