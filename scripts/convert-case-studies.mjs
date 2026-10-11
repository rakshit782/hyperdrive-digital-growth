import fs from 'fs';

const content = fs.readFileSync('public/templates/case-studies-sample.csv', 'utf8');

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let current = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(current.trim());
      current = '';
      if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
        lines.push(row);
      }
      row = [];
    } else {
      current += char;
    }
  }
  if (current || row.length > 0) {
    row.push(current.trim());
    lines.push(row);
  }
  return lines;
}

const table = parseCSV(content);
const headers = table[0];
const rows = table.slice(1);

const parsed = rows.map((r) => {
  const item = {};
  headers.forEach((h, idx) => {
    item[h] = r[idx] || '';
  });
  return item;
});

console.log(`Parsed ${parsed.length} items`);
fs.writeFileSync('src/data/allBulkCaseStudies.json', JSON.stringify(parsed, null, 2));
console.log('Saved to src/data/allBulkCaseStudies.json');
