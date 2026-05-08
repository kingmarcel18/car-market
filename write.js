require('fs').writeFileSync('app/page.tsx', '"use client"\n\nexport default function Home() {\n  return <div>test</div>\n}\n', 'utf8');
console.log('done');
