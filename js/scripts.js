// scripts.js

function calculateMAPI() {
    const sex = document.getElementById('sex_female').checked ? 1 : 0;
    const mcv = parseFloat(document.getElementById('mcv').value);
    let ggt = parseFloat(document.getElementById('ggt').value);
    let hdl = parseFloat(document.getElementById('hdl').value);
    let hba1c = parseFloat(document.getElementById('hba1c').value);

    // Unit conversions
    if (document.getElementById('ggt_ukat').checked) {
        ggt = ggt * 60; // µkat/L to U/L
    }

    if (document.getElementById('hdl_mmoll').checked) {
        hdl = hdl * 38.67; // mmol/L to mg/dL
    }

    if (document.getElementById('hba1c_mmoll').checked) {
        hba1c = (hba1c / 10.929) + 2.15; // mmol/mol to %
    }

    // Basic validation
    if (isNaN(mcv) || isNaN(ggt) || isNaN(hdl) || isNaN(hba1c)) {
        document.getElementById('mapi_result').textContent = "Please fill in all fields.";
        return;
    }

    // MAPI formula
    const lp = -31.679
        - 1.323 * sex
        + 6.347 * Math.log(mcv)
        + 0.583 * Math.log(ggt)
        + 1.934 * Math.log(hdl)
        - 4.109 * Math.log(hba1c);

    const mapi = Math.exp(lp) / (1 + Math.exp(lp));
    const percent = (mapi * 100).toFixed(1);

    document.getElementById('mapi_result').textContent = `${percent}% predicted probability of MetALD-ALD.`;
}
