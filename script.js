function generateAndCopyBibTeX() {
    // Call parseText to ensure the BibTeX is up to date
    parseText();

    // Select and copy the BibTeX output
    const bibtexOutput = document.getElementById('bibtex-output');
    const range = document.createRange();
    range.selectNode(bibtexOutput);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
        alert("BibTeX copied to clipboard!");
    } catch(err) {
        alert("Failed to copy BibTeX.");
    }
}

function parseText() {
    const inputText = document.getElementById('input-text').value;
    let author = '';
    let title = '';
    let year = '';

    // Simple regex patterns to match common formats
    const yearMatch = inputText.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
        year = yearMatch[0];
    }

    const authorMatch = inputText.match(/^[^\d]+(?=\s\(\d{4}\)|\s\d{4})/);
    if (authorMatch) {
        author = authorMatch[0].trim();
    }

    // Assume the title is the part between author/year and the journal or other source
    const titleMatch = inputText.match(/["“](.*?)["”]/);
    if (titleMatch) {
        title = titleMatch[1];
    } else {
        // If no quotes are found, assume the title is between the author and the year
        const possibleTitle = inputText.replace(author, '').replace(year, '').trim();
        title = possibleTitle.split('.')[0];
    }

    // Create a simple BibTeX entry
    let bibtex = `@article{,\n`;
    bibtex += `  author = {${author}},\n`;
    bibtex += `  title = {${title}},\n`;
    bibtex += `  year = {${year}}\n`;
    bibtex += `}`;

    document.getElementById('bibtex-output').textContent = bibtex;
}
