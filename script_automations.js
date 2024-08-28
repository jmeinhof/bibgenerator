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