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

// ✅ Trigger deployment function calling your backend proxy
function triggerDeployment() {
  const vmType = selectedAssets.Infrastructure;

  if (!vmType) {
    alert("⚠️ Please select a Virtual Machine before deploying.");
    return;
  }

  // Replace this URL with your actual backend API endpoint URL
  const proxyUrl = "https://your-backend-domain/api/trigger-deploy";

  fetch(proxyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ vm_type: vmType })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(`✅ ${data.message}`);
      } else if (data.error) {
        alert(`❌ ${data.error}`);
      } else {
        alert("❌ Deployment failed, see console for details.");
        console.error(data);
      }
    })
    .catch(err => {
      console.error("❌ Network error:", err);
      alert("❌ Could not reach deployment service.");
    });
}
