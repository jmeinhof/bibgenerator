let selectedOption = 'Gesetz'; // Default option

window.onload = function() {
    setOption(selectedOption); // Automatically select the default option on page load
    addEventListeners();       // Add event listeners for all inputs
};

function setOption(option) {
    selectedOption = option;

    // Show or hide input fields based on the selected option
    document.getElementById('input-fields-Gesetz').style.display = (option === 'Gesetz') ? 'block' : 'none';
    document.getElementById('input-fields-Gesetzentwurf').style.display = (option === 'Gesetzentwurf') ? 'block' : 'none';
    document.getElementById('input-fields-Entscheidung').style.display = (option === 'Entscheidung') ? 'block' : 'none';

    // Update button styles to reflect the selected option
    document.getElementById('buttonGesetz').classList.toggle('active', option === 'Gesetz');
    document.getElementById('buttonGesetzentwurf').classList.toggle('active', option === 'Gesetzentwurf');
    document.getElementById('buttonEntscheidung').classList.toggle('active', option === 'Entscheidung');

    generateRIS(); // Update RIS output whenever the option is changed
    generatePlain(); 
}

function addEventListeners() {
    const fields = [
        'title_ti_Gesetz', 'date_da_Gesetz', 'volume_vl_Gesetz', 
        'startpage_sp_Gesetz', 'title2_t2_Gesetz', 'title_short_la_Gesetz',
        'title_ti_Gesetzentwurf', 'date_da_Gesetzentwurf',
        'title3_t3_Gesetzentwurf', 'aktenzeichen_m1_Gesetzentwurf',
        'title_ti_Entscheidung', 'date_da_Entscheidung',
        'fundstelle_a2_Entscheidung', 'volume_vl_Entscheidung', 'startpage_sp_Entscheidung',
        'publisher_pb_Entscheidung', 'aktenzeichen_sv_Entscheidung'
    ];

    fields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => {
                generateRIS();
                generatePlain();
            });
        }
    });
}

function generateRIS() {
    let ris = '';

    if (selectedOption === 'Gesetz') {
        ris += `TY  - STAT\n`;
        ris += `TI  - ${getElementValue('title_ti_Gesetz')}\n`;
        ris += `DA  - ${getElementValue('date_da_Gesetz')}\n`;
        ris += `T2  - ${getElementValue('title2_t2_Gesetz')}\n`;
        ris += `VL  - ${getElementValue('volume_vl_Gesetz')}\n`;
        ris += `SP  - ${getElementValue('startpage_sp_Gesetz')}\n`;
        ris += `LA  - ${getElementValue('title_short_la_Gesetz')}\n`;
    } else if (selectedOption === 'Gesetzentwurf') {
        ris += `TY  - BILL\n`;
        ris += `TI  - ${getElementValue('title_ti_Gesetzentwurf')}\n`;
        ris += `DA  - ${getElementValue('date_da_Gesetzentwurf')}\n`;
        ris += `T3  - ${getElementValue('title3_t3_Gesetzentwurf')}\n`;
        ris += `M1  - ${getElementValue('aktenzeichen_m1_Gesetzentwurf')}\n`;
    } else if (selectedOption === 'Entscheidung') {
        ris += `TY  - CASE\n`;
        ris += `TI  - ${getElementValue('title_ti_Entscheidung')}\n`;
        ris += `DA  - ${getElementValue('date_da_Entscheidung')}\n`;
        ris += `A2  - ${getElementValue('fundstelle_a2_Entscheidung')}\n`;
        ris += `VL  - ${getElementValue('volume_vl_Entscheidung')}\n`;
        ris += `SP  - ${getElementValue('startpage_sp_Entscheidung')}\n`;
        ris += `PB  - ${getElementValue('publisher_pb_Entscheidung')}\n`;
        ris += `SV  - ${getElementValue('aktenzeichen_sv_Entscheidung')}\n`;
    }

    ris += `ER  - \n`; // End of RIS reference

    document.getElementById('ris-output').value = ris;
}

function generatePlain() {
    let plain = '';
    let pcite = '';

    if (selectedOption === 'Gesetz') {
        plain += `${getElementValue('title_ti_Gesetz')} `;
        plain += `vom ${getElementValue('date_da_Gesetz')}, `;
        plain += `${getElementValue('title2_t2_Gesetz')} `;
        plain += `vom ${getElementValue('volume_vl_Gesetz')}, `;
        plain += `${getElementValue('startpage_sp_Gesetz')}.`;

        const fullDate = getElementValue('date_da_Gesetz');
        const yearFromDate = extractYear(fullDate); // Extracts the last 4 characters, assuming "29 August 2024" format

        pcite += `(${getElementValue('title_short_la_Gesetz')}, ${yearFromDate})`;
    } else if (selectedOption === 'Gesetzentwurf') {
        plain += `${getElementValue('title3_t3_Gesetzentwurf')}, `;
        plain += `${getElementValue('title_ti_Gesetzentwurf')}, `;
        plain += `${getElementValue('aktenzeichen_m1_Gesetzentwurf')} `;
        plain += `vom ${getElementValue('date_da_Gesetzentwurf')}.`;
    } else if (selectedOption === 'Entscheidung') {
        plain += `${getElementValue('publisher_pb_Entscheidung')}, `;
        plain += `${getElementValue('aktenzeichen_sv_Entscheidung')}, `;
        plain += `${getElementValue('date_da_Entscheidung')}, `;
        plain += `${getElementValue('title_ti_Entscheidung')}, `;
        plain += `${getElementValue('fundstelle_a2_Entscheidung')} `;
        plain += `vom ${getElementValue('volume_vl_Entscheidung')}`;
        if (getElementValue('startpage_sp_Entscheidung') !== '') {
            plain += `, ${getElementValue('startpage_sp_Entscheidung')}`;
        }
        plain += '.';
    }
    
    document.getElementById('plain-output').textContent = plain; 
    document.getElementById('pcite-output').textContent = pcite; 
}

function getElementValue(id) {
    return document.getElementById(id).value || ''; // Returns the value of the element or an empty string if undefined
}

function extractYear(dateString) {
    const dateParts = dateString.split(' ');
    return dateParts[dateParts.length - 1] || ''; // Assumes the year is the last part of the date string
}

function copyRIS() {
    generateRIS(); // Ensure the RIS is up-to-date
    const risOutput = document.getElementById('ris-output').value;

    navigator.clipboard.writeText(risOutput).then(() => {
        // Show the notification
        const notification = document.getElementById('copy-notification');
        notification.style.display = 'block';

        // Fade out the notification after 2 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
