document.getElementById('optionA').addEventListener('change', handleOptionChange);
document.getElementById('optionB').addEventListener('change', handleOptionChange);
document.getElementById('author').addEventListener('input', generateBibTeX);
document.getElementById('authority').addEventListener('input', generateBibTeX);
document.getElementById('title').addEventListener('input', generateBibTeX);
document.getElementById('year').addEventListener('input', generateBibTeX);

function handleOptionChange() {
    const optionA = document.getElementById('optionA').checked;
    const authorInput = document.getElementById('author-input');
    const authorityInput = document.getElementById('authority-input');
    
    if (optionA) {
        authorInput.style.display = 'block';
        authorityInput.style.display = 'none';
    } else {
        authorInput.style.display = 'none';
        authorityInput.style.display = 'block';
    }

    generateBibTeX(); // Update BibTeX output whenever the option is changed
}

function generateBibTeX() {
    const optionA = document.getElementById('optionA').checked;
    let authorOrAuthority = '';
    
    if (optionA) {
        authorOrAuthority = document.getElementById('author').value;
    } else {
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
