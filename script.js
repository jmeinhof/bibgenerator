let selectedOption = 'A'; // Set default option to 'A'

window.onload = function() {
    setOption('A'); // Automatically select "A" on page load
    document.getElementById('author').addEventListener('input', generateBibTeX);
    document.getElementById('authority').addEventListener('input', generateBibTeX);
    document.getElementById('title').addEventListener('input', generateBibTeX);
    document.getElementById('year').addEventListener('input', generateBibTeX);
};

function setOption(option) {
    const buttonA = document.getElementById('buttonA');
    const buttonB = document.getElementById('buttonB');
    const authorInput = document.getElementById('author-input');
    const authorityInput = document.getElementById('authority-input');

    if (option === 'A') {
        selectedOption = 'A';
        buttonA.classList.add('active');
        buttonB.classList.remove('active');
        authorInput.style.display = 'block';
        authorityInput.style.display = 'none';
    } else if (option === 'B') {
        selectedOption = 'B';
        buttonA.classList.remove('active');
        buttonB.classList.add('active');
        authorInput.style.display = 'none';
        authorityInput.style.display = 'block';
    }

    generateBibTeX(); // Update BibTeX output whenever the option is changed
}

function generateBibTeX() {
    let authorOrAuthority = '';
    
    if (selectedOption === 'A') {
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
    alert('BibTeX copied to clipboard!'); // Optional: notify the user that the text has been copied
}
