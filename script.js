let selectedOption = 'Gesetz'; // Set default option to 'Gesetz'

window.onload = function() {
    setOption('Gesetz'); // Automatically select "A" on page load

    // Add event listeners for real-time BibTeX generation
    document.getElementById('author').addEventListener('input', generateBibTeX);
    document.getElementById('authority').addEventListener('input', generateBibTeX);
    document.getElementById('title').addEventListener('input', generateBibTeX);
    document.getElementById('year').addEventListener('input', generateBibTeX);
};

function setOption(option) {
    const buttonGesetz = document.getElementById('buttonGesetz');
    const buttonB = document.getElementById('buttonB');
    const authorInput = document.getElementById('author-input');
    const authorityInput = document.getElementById('authority-input');

    if (option === 'Gesetz') {
        selectedOption = 'Gesetz';
        buttonGesetz.classList.add('active');
        buttonB.classList.remove('active');
        authorInput.style.display = 'block';
        authorityInput.style.display = 'none';
    } else if (option === 'B') {
        selectedOption = 'B';
        buttonGesetz.classList.remove('active');
        buttonB.classList.add('active');
        authorInput.style.display = 'none';
        authorityInput.style.display = 'block';
    }

    generateBibTeX(); // Update BibTeX output whenever the option is changed
}

function generateBibTeX() {
    let authorOrAuthority = '';
    
    if (selectedOption === 'Gesetz') {
        authorOrAuthority = document.getElementById('author').value;
    } else if (selectedOption === 'B') {
        authorOrAuthority = document.getElementById('authority').value;
    }
    
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;

    // Create a simple BibTeX entry
    let bibtex = `@article{,\n`;
    bibtex += `  author = {${authorOrAuthority}},\n`;
    bibtex += `  title = {${title}},\n`;
    bibtex += `  year = {${year}}\n`;
    bibtex += `}`;

    document.getElementById('bibtex-output').value = bibtex;
}

function copyBibTeX() {
    generateBibTeX(); // Ensure the BibTeX is up-to-date
    const bibtexOutput = document.getElementById('bibtex-output');
    bibtexOutput.select();
    document.execCommand('copy');

    // Show the notification
    const notification = document.getElementById('copy-notification');
    notification.style.display = 'block';

    // Fade out the notification after 2 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}
