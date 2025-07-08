// scripts.js

function calculateMAPI() {
  // Retrieve values from the form fields
  const sex = document.getElementById('sex_female').checked ? 1 : 0;
  const mcv = parseFloat(document.getElementById('mcv').value);
  let ggt = parseFloat(document.getElementById('ggt').value);
  let hdl = parseFloat(document.getElementById('hdl').value);
  let hba1c = parseFloat(document.getElementById('hba1c').value);

  // Unit conversions if needed
  if (document.getElementById('ggt_ukat').checked) {
    ggt = ggt * 60; // Convert µkat/L to U/L
  }

  if (document.getElementById('hdl_mmoll').checked) {
    hdl = hdl * 38.67; // Convert mmol/L to mg/dL
  }

  if (document.getElementById('hba1c_mmoll').checked) {
    hba1c = (hba1c / 10.929) + 2.15; // Convert mmol/mol to %
  }

  // Basic validation: ensure all fields are valid numbers
  if (isNaN(mcv) || isNaN(ggt) || isNaN(hdl) || isNaN(hba1c)) {
    document.getElementById('mapi_result').textContent = "Please fill in all fields.";
    return;
  }

  // Compute lp according to the provided formula
  const lp = -31.679
    - 1.323 * sex
    + 6.347 * Math.log(mcv)
    + 0.583 * Math.log(ggt)
    + 1.934 * Math.log(hdl)
    - 4.109 * Math.log(hba1c);

  // Calculate MAPI probability
  const mapi = Math.exp(lp) / (1 + Math.exp(lp));
  const percent = (mapi * 100).toFixed(1);
  
  document.getElementById('mapi_result').textContent = `${percent}% predicted probability of MetALD-ALD.`;
}

// Attach event listeners to recalc MAPI on input changes
document.getElementById("mcv").addEventListener("input", calculateMAPI);
document.getElementById("ggt").addEventListener("input", calculateMAPI);
document.getElementById("hdl").addEventListener("input", calculateMAPI);
document.getElementById("hba1c").addEventListener("input", calculateMAPI);

document.getElementById("sex_female").addEventListener("click", calculateMAPI);
document.getElementById("sex_male").addEventListener("click", calculateMAPI);

document.getElementById("ggt_ul").addEventListener("click", calculateMAPI);
document.getElementById("ggt_ukat").addEventListener("click", calculateMAPI);

document.getElementById("hdl_mgdl").addEventListener("click", calculateMAPI);
document.getElementById("hdl_mmoll").addEventListener("click", calculateMAPI);

document.getElementById("hba1c_percent").addEventListener("click", calculateMAPI);
document.getElementById("hba1c_mmoll").addEventListener("click", calculateMAPI);
