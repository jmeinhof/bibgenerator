let selectedOption = 'Gesetz'; // Set default option to 'Gesetz'

window.onload = function() {
    setOption('Gesetz'); // Automatically select "A" on page load

    // Add event listeners, general
    document.getElementById('type_ty').addEventListener('input', generateBibTeX);
    document.getElementById('title_ti').addEventListener('input', generateBibTeX);
    document.getElementById('date_da').addEventListener('input', generateBibTeX);

    // Gesetz + Entscheidung
    document.getElementById('volume_vl').addEventListener('input', generateBibTeX);
    document.getElementById('startpage_sp').addEventListener('input', generateBibTeX);
    
    // Gesetz
    document.getElementById('title2_t2').addEventListener('input', generateBibTeX);
    
    document.getElementById('title_short_la').addEventListener('input', generateBibTeX);  // Use language (la) as a helper var for short title

    // Gesetzentwurf
    document.getElementById('title3_t3').addEventListener('input', generateBibTeX);
    document.getElementById('aktenzeichen_m1').addEventListener('input', generateBibTeX);

    // Entscheidung
    document.getElementById('fundstelle_a2').addEventListener('input', generateBibTeX);
    document.getElementById('publisher_pb').addEventListener('input', generateBibTeX);
    document.getElementById('aktenzeichen_sv').addEventListener('input', generateBibTeX);
    
    document.getElementById('author').addEventListener('input', generateBibTeX);
    document.getElementById('authority').addEventListener('input', generateBibTeX);
    document.getElementById('year').addEventListener('input', generateBibTeX);
};

function setOption(option) {
    const buttonGesetz = document.getElementById('buttonGesetz');
    const buttonGesetzentwurf = document.getElementById('buttonGesetzentwurf');
    const buttonEntscheidung = document.getElementById('buttonEntscheidung');
    const authorInput = document.getElementById('author-input');
    const authorityInput = document.getElementById('authority-input');
    
    if (option === 'Gesetz') {
        selectedOption = 'Gesetz';
        buttonGesetz.classList.add('active');
        buttonGesetzentwurf.classList.remove('active');
        buttonEntscheidung.classList.remove('active');
        
        authorInput.style.display = 'block';
        authorityInput.style.display = 'none';
    } else if (option === 'Gesetzentwurf') {
        selectedOption = 'Gesetzentwurf';
        buttonGesetz.classList.remove('active');
        buttonGesetzentwurf.classList.add('active');
        buttonEntscheidung.classList.remove('active');
        authorInput.style.display = 'none';
        authorityInput.style.display = 'block';
    } else if (option === 'Entscheidung') {
        selectedOption = 'Entscheidung';
        buttonGesetz.classList.remove('active');
        buttonGesetzentwurf.classList.add('active');
        buttonEntscheidung.classList.remove('active');
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
