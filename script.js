let selectedOption = 'Gesetz'; // Set default option to 'Gesetz'

window.onload = function() {
    setOption('Gesetz'); // Automatically select "Gesetz" on page load

    // Add event listeners for all inputs
    addEventListeners();
};

function setOption(option) {
    selectedOption = option;

    // Display or hide input fields based on the selected option
    document.getElementById('input-fields-Gesetz').style.display = (option === 'Gesetz') ? 'block' : 'none';
    document.getElementById('input-fields-Gesetzentwurf').style.display = (option === 'Gesetzentwurf') ? 'block' : 'none';
    document.getElementById('input-fields-Entscheidung').style.display = (option === 'Entscheidung') ? 'block' : 'none';

    // Update button styles
    document.getElementById('buttonGesetz').classList.toggle('active', option === 'Gesetz');
    document.getElementById('buttonGesetzentwurf').classList.toggle('active', option === 'Gesetzentwurf');
    document.getElementById('buttonEntscheidung').classList.toggle('active', option === 'Entscheidung');

    generateRIS(); // Update RIS output whenever the option is changed
}

function addEventListeners() {
    const fields = [
        'type_ty_Gesetz', 'title_ti_Gesetz', 'date_da_Gesetz', 'volume_vl_Gesetz', 
        'startpage_sp_Gesetz', 'title2_t2_Gesetz', 'title_short_la_Gesetz',
        'type_ty_Gesetzentwurf', 'title_ti_Gesetzentwurf', 'date_da_Gesetzentwurf',
        'title3_t3_Gesetzentwurf', 'aktenzeichen_m1_Gesetzentwurf',
        'type_ty_Entscheidung', 'title_ti_Entscheidung', 'date_da_Entscheidung',
        'fundstelle_a2_Entscheidung', 'volume_vl_Entscheidung', 'startpage_sp_Entscheidung',
        'publisher_pb_Entscheidung', 'aktenzeichen_sv_Entscheidung'
    ];

    fields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', generateRIS);
        }
    });
}

function generateRIS() {
    let ris = '';

    if (selectedOption === 'Gesetz') {
        ris += `TY  - STAT\n`;
        ris += `TI  - ${document.getElementById('title_ti_Gesetz').value}\n`;
        ris += `DA  - ${document.getElementById('date_da_Gesetz').value}\n`;
        ris += `T2  - ${document.getElementById('title2_t2_Gesetz').value}\n`;
        ris += `VL  - ${document.getElementById('volume_vl_Gesetz').value}\n`;
        ris += `SP  - ${document.getElementById('startpage_sp_Gesetz').value}\n`;
        ris += `LA  - ${document.getElementById('title_short_la_Gesetz').value}\n`;
    } else if (selectedOption === 'Gesetzentwurf') {
        ris += `TY  - ${document.getElementById('type_ty_Gesetzentwurf').value}\n`;
        ris += `TI  - ${document.getElementById('title_ti_Gesetzentwurf').value}\n`;
        ris += `DA  - ${document.getElementById('date_da_Gesetzentwurf').value}\n`;
        ris += `T3  - ${document.getElementById('title3_t3_Gesetzentwurf').value}\n`;
        ris += `M1  - ${document.getElementById('aktenzeichen_m1_Gesetzentwurf').value}\n`;
    } else if (selectedOption === 'Entscheidung') {
        ris += `TY  - ${document.getElementById('type_ty_Entscheidung').value}\n`;
        ris += `TI  - ${document.getElementById('title_ti_Entscheidung').value}\n`;
        ris += `DA  - ${document.getElementById('date_da_Entscheidung').value}\n`;
        ris += `A2  - ${document.getElementById('fundstelle_a2_Entscheidung').value}\n`;
        ris += `VL  - ${document.getElementById('volume_vl_Entscheidung').value}\n`;
        ris += `SP  - ${document.getElementById('startpage_sp_Entscheidung').value}\n`;
        ris += `PB  - ${document.getElementById('publisher_pb_Entscheidung').value}\n`;
        ris += `SV  - ${document.getElementById('aktenzeichen_sv_Entscheidung').value}\n`;
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
