// Make functions globally accessible
console.log('Main.js loaded successfully');
window.buildMailto = function(subject, body){
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:bulldogprinters@gmail.com?subject=${s}&body=${b}`;
}

window.quickQuote = function(product){
  const subject = `Quote request: ${product} (Bulldog Printers)`;
  const body = `Hi Bulldog Printers,\n\nI'm looking for a quote on: ${product}.\nQuantity: ____\nSize/Specs: ____\nPaper/Material: ____\nFinishing (if any): ____\nShipping city/state: ____\nDeadline (if any): ____\n\nMy name:\nMy company:\nMy phone:\n\nThanks!`;
  window.location.href = window.buildMailto(subject, body);
}

window.specHelp = function(product){
  const subject = `Spec help needed: ${product} (Bulldog Printers)`;
  const body = `Hello,\n\nI'm interested in ${product} but could use some help.\n\nCan you call me at: ____\n\nMy name:\nMy email:\nBest time to call:\n\nThanks!`;
  window.location.href = window.buildMailto(subject, body);
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

      window.location.href = buildMailto(subject, body);
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
