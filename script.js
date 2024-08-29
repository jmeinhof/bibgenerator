let selectedOption = 'Gesetz'; // Set default option to 'Gesetz'

window.onload = function() {
    setOption('Gesetz'); // Automatically select "Gesetz" on page load

    // Add event listeners for all inputs
    document.getElementById('type_ty').addEventListener('input', generateRIS);
    document.getElementById('title_ti').addEventListener('input', generateRIS);
    document.getElementById('date_da').addEventListener('input', generateRIS);
    document.getElementById('volume_vl').addEventListener('input', generateRIS);
    document.getElementById('startpage_sp').addEventListener('input', generateRIS);
    document.getElementById('title2_t2').addEventListener('input', generateRIS);
    document.getElementById('title_short_la').addEventListener('input', generateRIS);
    document.getElementById('title3_t3').addEventListener('input', generateRIS);
    document.getElementById('aktenzeichen_m1').addEventListener('input', generateRIS);
    document.getElementById('fundstelle_a2').addEventListener('input', generateRIS);
    document.getElementById('publisher_pb').addEventListener('input', generateRIS);
    document.getElementById('aktenzeichen_sv').addEventListener('input', generateRIS);
};

function setOption(option) {
    selectedOption = option;
    
    document.getElementById('input-fields-Gesetz').style.display = (option === 'Gesetz') ? 'block' : 'none';
    document.getElementById('input-fields-Gesetzentwurf').style.display = (option === 'Gesetzentwurf') ? 'block' : 'none';
    document.getElementById('input-fields-Entscheidung').style.display = (option === 'Entscheidung') ? 'block' : 'none';

    // Update button styles
    document.getElementById('buttonGesetz').classList.toggle('active', option === 'Gesetz');
    document.getElementById('buttonGesetzentwurf').classList.toggle('active', option === 'Gesetzentwurf');
    document.getElementById('buttonEntscheidung').classList.toggle('active', option === 'Entscheidung');

    generateRIS(); // Update RIS output whenever the option is changed
}

function generateRIS() {
    let ris = `TY  - ${document.getElementById('type_ty').value}\n`;
    ris += `TI  - ${document.getElementById('title_ti').value}\n`;
    ris += `DA  - ${document.getElementById('date_da').value}\n`;

    if (selectedOption === 'Gesetz') {
        ris += `T2  - ${document.getElementById('title2_t2').value}\n`;
        ris += `VL  - ${document.getElementById('volume_vl').value}\n`;
        ris += `SP  - ${document.getElementById('startpage_sp').value}\n`;
        ris += `LA  - ${document.getElementById('title_short_la').value}\n`;
    } else if (selectedOption === 'Gesetzentwurf') {
        ris += `T3  - ${document.getElementById('title3_t3').value}\n`;
        ris += `M1  - ${document.getElementById('aktenzeichen_m1').value}\n`;
    } else if (selectedOption === 'Entscheidung') {
        ris += `A2  - ${document.getElementById('fundstelle_a2').value}\n`;
        ris += `VL  - ${document.getElementById('volume_vl').value}\n`;
        ris += `SP  - ${document.getElementById('startpage_sp').value}\n`;
        ris += `PB  - ${document.getElementById('publisher_pb').value}\n`;
        ris += `SV  - ${document.getElementById('aktenzeichen_sv').value}\n`;
    }

    ris += `ER  - \n`; // End of RIS reference

    document.getElementById('ris-output').value = ris;
}

function copyRIS() {
    generateRIS(); // Ensure the RIS is up-to-date
    const risOutput = document.getElementById('ris-output');
    risOutput.select();
    document.execCommand('copy');

    // Show the notification
    const notification = document.getElementById('copy-notification');
    notification.style.display = 'block';

    // Fade out the notification after 2 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}
