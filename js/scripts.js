function calculateMAPI() {
  const sex = document.getElementById("sex_female").checked ? 1 : 0;
  const mcv = parseFloat(document.getElementById("mcv").value);
  let ggt = parseFloat(document.getElementById("ggt").value);
  let hdl = parseFloat(document.getElementById("hdl").value);
  let hba1c = parseFloat(document.getElementById("hba1c").value);

  // Unit conversion
  if (document.getElementById("ggt_ukat").checked) {
    ggt = ggt * 60;
  }

  if (document.getElementById("hdl_mmoll").checked) {
    hdl = hdl * 38.67;
  }

  if (document.getElementById("hba1c_mmoll").checked) {
    hba1c = (hba1c / 10.929) + 2.15;
  }

  if (isNaN(mcv) || isNaN(ggt) || isNaN(hdl) || isNaN(hba1c)) {
    document.getElementById("mapi_value").value = "NaN";
    document.getElementById("mapi_percentage").innerHTML = "% predicted probability<br>of MetALD-ALD";
    return;
  }

  const lp =
    -31.679 +
    -1.323 * sex +
    6.347 * Math.log(mcv) +
    0.583 * Math.log(ggt) +
    1.934 * Math.log(hdl) +
    -4.109 * Math.log(hba1c);

  const mapi = Math.exp(lp) / (1 + Math.exp(lp));
  const display = mapi.toFixed(3);
  const percent = Math.round(mapi * 100);

  document.getElementById("mapi_value").value = display;
  document.getElementById("mapi_percentage").innerHTML = `${percent}% predicted probability<br>of MetALD-ALD`;
}

// Optional: auto-update on input
["sex_female", "sex_male", "mcv", "ggt", "hdl", "hba1c",
 "ggt_ul", "ggt_ukat",
 "hdl_mgdl", "hdl_mmoll",
 "hba1c_percent", "hba1c_mmoll"]
.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", calculateMAPI);
});
