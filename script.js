function generateBibTeX() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;

    // Create a simple BibTeX entry
    let bibtex = `@article{,\n`;
    bibtex += `  author = {${author}},\n`;
    bibtex += `  title = {${title}},\n`;
    bibtex += `  year = {${year}}\n`;
    bibtex += `}`;

    document.getElementById('bibtex-output').value = bibtex;
}
