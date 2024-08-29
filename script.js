let selectedOption = 'option1'; // Set default option to 'option1'

window.onload = function() {
    setOption('option1'); // Automatically select "option1" on page load

    // Add event listeners for real-time RIS generation
    for (let i = 1; i <= 11; i++) {
        document.getElementById(`inputField${i}`).addEventListener('input', generateRIS);
    }
};

function setOption(option) {
    selectedOption = option;

    // Update active button
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => button.classList.remove('active'));
    document.getElementById(`button${option.match(/\d+/)[0]}`).classList.add('active');

    // Show corresponding input fields based on the selected option
    for (let i = 1; i <= 11; i++) {
        document.getElementById(`input${i}`).style.display = 'none';
    }

    if (option === 'option1') {
        // Show relevant fields for option 1
        document.getElementById('input1').style.display = 'block';
        document.getElementById('input2').style.display = 'block';
    } else if (option === 'option2') {
        // Show relevant fields for option 2
        document.getElementById('input3').style.display = 'block';
        document.getElementById('input4').style.display = 'block';
    }
    // Add more conditions for other options...
    // Optionally, include different fields based on selected option
    generateRIS(); // Update RIS output whenever the option is changed
}

function generateRIS() {
    let ris = `TY  - ${selectedOption}\n`;

    for (let i = 1; i <= 11; i++) {
        const inputValue = document.getElementById(`inputField${i}`).value;
        if (inputValue) {
            ris += `Field${i} - ${inputValue}\n`;
        }
    }

    ris += `ER  - \n`; // End of RIS entry

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
