let selectedAssets = {
  Infrastructure: null
};

// ✅ Load catalog.json and populate dropdown
fetch("catalog.json")
  .then(response => response.json())
  .then(data => {
    const infraSelect = document.getElementById("infrastructure-select");
    data.forEach(item => {
      if (item.category === "Infrastructure") {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.name;
        infraSelect.appendChild(option);
      }
    });

    infraSelect.addEventListener("change", (e) => {
      selectedAssets.Infrastructure = e.target.value;
    });
  })
  .catch(err => {
    console.error("Failed to load catalog.json:", err);
    alert("❌ Failed to load VM list.");
  });

// ✅ Trigger deployment function
function triggerDeployment() {
  const vmType = selectedAssets.Infrastructure;

  if (!vmType) {
    alert("⚠️ Please select a Virtual Machine before deploying.");
    return;
  }

  const token = "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"; // Replace securely
  const owner = "rachanarao1";
  const repo = "golden";
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/deploy.yml/dispatches`;

  fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: "main",
      inputs: {
        vm_type: vmType
      }
    })
  })
    .then(response => {
      if (response.status === 204) {
        alert(`✅ Deployment triggered for: ${vmType}`);
      } else {
        return response.json().then(data => {
          console.error("❌ GitHub API error:", data);
          alert("❌ Deployment failed. See console for details.");
        });
      }
    })
    .catch(err => {
      console.error("❌ Network error:", err);
      alert("❌ Could not reach GitHub API.");
    });
}
