
function buildMailto(subject, body){
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:andy@maimports.com?subject=${s}&body=${b}`;
}
function quickQuote(product){
  const phone = '480-382-1623';
  const subject = `Quote request: ${product} (Bulldog Printers)`;
  const body = `Hi Bulldog Printers,%0D%0A%0D%0AI'm looking for a quote on: ${product}.%0D%0AQuantity: ____%0D%0ASize/Specs: ____%0D%0APaper/Material: ____%0D%0AFinishing (if any): ____%0D%0AShipping city/state: ____%0D%0ADeadline (if any): ____%0D%0A%0D%0AMy name:%0D%0AMy company:%0D%0AMy phone:%0D%0A%0D%0AThanks!`;
  window.location.href = buildMailto(subject, body);
}
