// Make functions globally accessible
console.log('Main.js loaded successfully');

// Universal email function - tries mailto, falls back to Gmail web interface
window.sendEmail = function(subject, body){
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  // Build both URLs
  const mailto = `mailto:bulldogprinters@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=bulldogprinters@gmail.com&su=${encodedSubject}&body=${encodedBody}`;

  // Track if page loses focus (mailto opened successfully)
  let mailtoWorked = false;

  const onBlur = () => {
    mailtoWorked = true;
    window.removeEventListener('blur', onBlur);
  };

  window.addEventListener('blur', onBlur);

  // Try mailto first (works for users with email client configured)
  window.location.href = mailto;

  // Fallback: After a delay, if mailto didn't work, offer alternatives
  setTimeout(() => {
    window.removeEventListener('blur', onBlur);

    // Only show dialog if mailto didn't work
    if (!mailtoWorked) {
      if (confirm('Click OK to open Gmail\nor Cancel to copy the email address.')) {
        window.open(gmail, '_blank');
      } else {
        // Copy email to clipboard as fallback
        navigator.clipboard.writeText('bulldogprinters@gmail.com').then(() => {
          alert('Email address copied: bulldogprinters@gmail.com');
        }).catch(() => {
          alert('Email: bulldogprinters@gmail.com');
        });
      }
    }
  }, 1500);
}

window.quickQuote = function(product){
  const subject = `Quote request: ${product} (Bulldog Printers)`;
  const body = `Hi Bulldog Printers,\n\nI'm looking for a quote on: ${product}.\nQuantity: ____\nSize/Specs: ____\nPaper/Material: ____\nFinishing (if any): ____\nShipping city/state: ____\nDeadline (if any): ____\n\nMy name:\nMy company:\nMy phone:\n\nThanks!`;
  window.sendEmail(subject, body);
}

window.specHelp = function(product){
  const subject = `Spec help needed: ${product} (Bulldog Printers)`;
  const body = `Hello,\n\nI'm interested in ${product} but could use some help.\n\nCan you call me at: ____\n\nMy name:\nMy email:\nBest time to call:\n\nThanks!`;
  window.sendEmail(subject, body);
}
/* Mobile menu toggle */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const list = document.querySelector('nav ul');
  if(toggle && list){
    toggle.addEventListener('click', () => {
      const isOpen = list.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    list.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      list.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', (e) => {
      if(!list.contains(e.target) && !toggle.contains(e.target)){
        list.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const company = document.getElementById('company').value;
      const product = document.getElementById('product').value;
      const quantity = document.getElementById('quantity').value;
      const material = document.getElementById('material').value;
      const deadline = document.getElementById('deadline').value;
      const details = document.getElementById('details').value;

      const subject = `Contact Form: ${product} - ${name}`;
      const body = `Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}

Product Type: ${product}
Quantity: ${quantity}
Preferred Material: ${material}
Deadline: ${deadline}

Project Details:
${details}`;

      window.sendEmail(subject, body);
    });
  }
});


// Improve menu behavior: close on Escape/scroll
document.addEventListener('keydown', (e)=>{
  const list = document.querySelector('nav ul');
  const toggle = document.querySelector('.menu-toggle');
  if(e.key === 'Escape' && list && toggle){
    list.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }
});
window.addEventListener('scroll', ()=>{
  const list = document.querySelector('nav ul');
  const toggle = document.querySelector('.menu-toggle');
  if(list && toggle){
    list.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }
});
