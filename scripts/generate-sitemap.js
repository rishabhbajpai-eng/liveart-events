import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.liveartevents.in';

function extractIds(content, arrayName) {
  const arrayRegex = new RegExp(`export const ${arrayName} = \\[([\\s\\S]*?)\\];`, 'm');
  const arrayMatch = content.match(arrayRegex);
  if (!arrayMatch) return [];

  const ids = [];
  const entries = arrayMatch[1].split('},');
  
  for (const entry of entries) {
    // Try to find id or slug
    const idMatch = entry.match(/id:\s*['"]([^'"]+)['"]/);
    const slugMatch = entry.match(/slug:\s*['"]([^'"]+)['"]/);
    
    if (idMatch) ids.push(idMatch[1]);
    else if (slugMatch) ids.push(slugMatch[1]);
  }
  
  return [...new Set(ids)];
}

async function generate() {
  console.log('Generating dynamic sitemap...');
  
  const constantsPath = path.resolve('src/constants.js');
  const content = fs.readFileSync(constantsPath, 'utf8');

  const blogIds = extractIds(content, 'BLOG_POSTS');
  const citySlugs = extractIds(content, 'CITIES');
  const occasionSlugs = extractIds(content, 'OCCASIONS');

  const staticRoutes = [
    '',
    '/stations',
    '/packages',
    '/gallery',
    '/inspiration',
    '/partner',
    '/blog',
    '/contact',
    '/about',
    '/birthdays',
    '/weddings',
    '/wedding-games'
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static Routes
  staticRoutes.forEach(route => {
    xml += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  // Blogs
  blogIds.forEach(id => {
    xml += `  <url>\n    <loc>${BASE_URL}/blog/${id}</loc>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Cities
  citySlugs.forEach(slug => {
    xml += `  <url>\n    <loc>${BASE_URL}/city/${slug}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Occasions (Services)
  occasionSlugs.forEach(slug => {
    xml += `  <url>\n    <loc>${BASE_URL}/services/${slug}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  xml += '</urlset>';

  fs.writeFileSync(path.resolve('public/sitemap.xml'), xml);
  
  // Also write to dist/ if it exists, because this script runs post-build
  const distPath = path.resolve('dist/sitemap.xml');
  if (fs.existsSync(path.resolve('dist'))) {
    fs.writeFileSync(distPath, xml);
  }
  
  console.log(`Sitemap generated successfully with ${staticRoutes.length + blogIds.length + citySlugs.length + occasionSlugs.length} URLs.`);
}

generate();
