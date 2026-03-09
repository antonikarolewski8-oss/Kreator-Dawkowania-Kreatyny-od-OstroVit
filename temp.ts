const urls = [
  'https://ostrovit.com/pl/products/ostrovit-monohydrat-kreatyny-3000-mg-120-tabletek-26572.html',
  'https://ostrovit.com/pl/products/ostrovit-monohydrat-kreatyny-500-g-16618.html',
  'https://ostrovit.com/pl/products/ostrovit-wpc-80-700-g-26507.html',
  'https://ostrovit.com/pl/products/ostrovit-fat-burner-vege-60-kapsulek-24156.html',
  'https://ostrovit.com/pl/products/ostrovit-pump-extreme-300-g-25481.html',
  'https://ostrovit.com/pl/products/ostrovit-bcaa-glutamina-200-g-16572.html'
];

async function fetchProduct(url) {
  const html = await fetch(url).then(r => r.text());
  const priceMatch = html.match(/<strong[^>]+class="projector_price_value"[^>]*>([^<]+)<\/strong>/);
  return {
    url,
    price: priceMatch ? priceMatch[1].trim() : null
  };
}

Promise.all(urls.map(fetchProduct)).then(results => console.log(JSON.stringify(results, null, 2)));
