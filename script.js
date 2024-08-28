document.getElementById('input-text').addEventListener('input', parseText);

function parseText() {
    const inputText = document.getElementById('input-text').value;
    let author = '';
    let title = '';
    let year = '';

    // Create a simple BibTeX entry
    let bibtex = `@article{,\n`;
    bibtex += `  author = {${author}},\n`;
    bibtex += `  title = {${title}},\n`;
    bibtex += `  year = {${year}}\n`;
    bibtex += `}`;

    document.getElementById('bibtex-output').value = bibtex;
}
