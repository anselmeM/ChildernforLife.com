const fs = require('fs');
const path = require('path');

const svgContent = fs.readFileSync(path.join(__dirname, 'africa.svg'), 'utf8');

// Regex to match paths: <path ... id="XX" data-name="Name" d="..." ... />
const pathRegex = /<path[^>]*id="([^"]+)"[^>]*data-name="([^"]+)"[^>]*d="([^"]+)"/g;

let match;
const countries = [];

while ((match = pathRegex.exec(svgContent)) !== null) {
  const code = match[1].toLowerCase();
  const name = match[2];
  const d = match[3];
  
  // Map code to project name if it matches active countries
  let id = code;
  if (code === 'bj') id = 'benin';
  else if (code === 'cm') id = 'cameroon';
  else if (code === 'cd') id = 'congo'; // Dem. Rep. Congo
  else if (code === 'et') id = 'ethiopia';
  else if (code === 'ng') id = 'nigeria';
  else if (code === 'tz') id = 'tanzania';
  
  countries.push({ id, name, d });
}

console.log(`Parsed ${countries.length} countries.`);

const activeColor = '#f37021';
const defaultColor = '#b8d8e8';
const hoverColor = '#89c4db';
const borderColor = '#ffffff';
const bgColor = '#d8eef6';

const operationalIds = ['benin', 'cameroon', 'congo', 'ethiopia', 'nigeria', 'tanzania'];

// We need centroids for the pin placement based on the new viewBox (0 0 1000 1001)
// Let's compute the approximate centroid of each operational country path
// Since we don't have full path analysis, we can look up bounding box or just use approximate points:
// Benin (BJ): around x=325, y=400
// Cameroon (CM): around x=450, y=460
// Congo (CD): around x=580, y=550
// Ethiopia (ET): around x=730, y=380
// Nigeria (NG): around x=380, y=340
// Tanzania (TZ): around x=670, y=560

const centroids = {
  benin: { x: 326, y: 390 },
  cameroon: { x: 440, y: 460 },
  congo: { x: 570, y: 550 },
  ethiopia: { x: 740, y: 380 },
  nigeria: { x: 380, y: 340 },
  tanzania: { x: 670, y: 560 }
};

const output = `import React from 'react';

/**
 * Detailed SVG map of Africa using real geographic outlines.
 * The \`activeCountry\` prop (one of: benin, cameroon, congo, ethiopia, nigeria, tanzania) highlights that country in orange.
 */
const AfricaMap = ({ activeCountry = 'benin' }) => {
  const activeColor = '#f37021';
  const defaultColor = '#b8d8e8';
  const hoverColor = '#89c4db';
  const borderColor = '#ffffff';
  const bgColor = '#d8eef6';

  const operationalIds = ['benin', 'cameroon', 'congo', 'ethiopia', 'nigeria', 'tanzania'];

  const countries = ${JSON.stringify(countries, null, 2)};

  const getCountryFill = (id) => {
    if (id === activeCountry) return activeColor;
    if (operationalIds.includes(id)) return '#3aa8c9';
    return defaultColor;
  };

  const getCountryStrokeWidth = (id) => {
    if (id === activeCountry) return 2.5;
    return 1;
  };

  const centroids = ${JSON.stringify(centroids, null, 2)};

  return (
    <svg
      viewBox="100 0 850 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-xl"
    >
      {/* Ocean background */}
      <rect x="100" y="0" width="850" height="1000" fill={bgColor} rx="12" />

      {/* Subtle grid lines */}
      {[200, 400, 600, 800].map(y => (
        <line key={\`h-\${y}\`} x1="100" y1={y} x2="950" y2={y} stroke="#c5dfe9" strokeWidth="0.5" strokeDasharray="4,4" />
      ))}
      {[250, 450, 650, 850].map(x => (
        <line key={\`v-\${x}\`} x1={x} y1="0" x2={x} y2="1000" stroke="#c5dfe9" strokeWidth="0.5" strokeDasharray="4,4" />
      ))}

      {/* All country paths */}
      {countries.map((country) => (
        <path
          key={country.id}
          d={country.d}
          fill={getCountryFill(country.id)}
          stroke={borderColor}
          strokeWidth={getCountryStrokeWidth(country.id)}
          strokeLinejoin="round"
          style={{
            transition: 'fill 0.3s ease, stroke-width 0.3s ease',
            cursor: operationalIds.includes(country.id) ? 'pointer' : 'default',
          }}
        />
      ))}

      {/* Active country marker pin */}
      {(() => {
        const pt = centroids[activeCountry];
        if (!pt) return null;
        return (
          <g>
            {/* Pulse ring */}
            <circle cx={pt.x} cy={pt.y} r="24" fill={activeColor} opacity="0.15">
              <animate attributeName="r" from="18" to="36" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.25" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Pin shadow */}
            <ellipse cx={pt.x} cy={pt.y + 20} rx="8" ry="3.5" fill="rgba(0,0,0,0.15)" />
            {/* Pin body */}
            <path
              d={\`M\${pt.x},\${pt.y - 30} C\${pt.x - 15},\${pt.y - 30} \${pt.x - 15},\${pt.y - 8} \${pt.x},\${pt.y} C\${pt.x + 15},\${pt.y - 8} \${pt.x + 15},\${pt.y - 30} \${pt.x},\${pt.y - 30} Z\`}
              fill={activeColor}
              stroke="#fff"
              strokeWidth="2"
            />
            {/* Pin inner dot */}
            <circle cx={pt.x} cy={pt.y - 18} r="5" fill="#fff" />
          </g>
        );
      })()}
    </svg>
  );
};

export default AfricaMap;
`;

fs.writeFileSync(path.join(__dirname, '../src/AfricaMap.jsx'), output, 'utf8');
console.log('Successfully wrote to src/AfricaMap.jsx');
