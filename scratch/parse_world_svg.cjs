const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'world.svg');
const outputPath = path.join(__dirname, '../src/WorldMap.jsx');

if (!fs.existsSync(svgPath)) {
  console.error("world.svg not found in scratch folder!");
  process.exit(1);
}

const svgContent = fs.readFileSync(svgPath, 'utf8');

const countries = [];
const pathTags = svgContent.match(/<path[^>]+>/g) || [];

pathTags.forEach(tag => {
  const dMatch = tag.match(/d="([^"]+)"/);
  const titleMatch = tag.match(/title="([^"]+)"/);
  const idMatch = tag.match(/id="([^"]+)"/);
  
  if (dMatch && idMatch) {
    const d = dMatch[1];
    const id = idMatch[1];
    const name = titleMatch ? titleMatch[1] : id;
    countries.push({ id, name, d });
  }
});

console.log(`Parsed ${countries.length} countries.`);

// Now we construct the React component text
const componentCode = `import React, { useState } from 'react';

/**
 * WorldMap - A high-fidelity inline SVG world outline map.
 * Highlight countries served by Children for Life / Cuso (Benin, Cameroon, DR Congo, Ethiopia, Nigeria, Tanzania).
 */
const WorldMap = ({ onCountryClick }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Operational mapping
  const operationalCountries = {
    'BJ': 'benin',
    'CM': 'cameroon',
    'CD': 'congo',
    'CG': 'congo', // also highlight Congo Rep for visual proximity
    'ET': 'ethiopia',
    'NG': 'nigeria',
    'TZ': 'tanzania'
  };

  const isHq = (id) => id === 'CA';
  const isOperational = (id) => !!operationalCountries[id];

  const getCountryFill = (id) => {
    if (isHq(id)) return '#ffc72c'; // Yellow Gold for HQ Canada
    if (isOperational(id)) {
      if (hoveredCountry === id) return '#ff8533'; // Brighter orange hover
      return '#f37021'; // Solid orange for operational countries
    }
    if (hoveredCountry === id) return '#173b63'; // Subtle hover for non-operational
    return '#0d233a'; // Dark blue outline for regular countries
  };

  const getCountryStroke = (id) => {
    if (isHq(id)) return '#ffc72c';
    if (isOperational(id)) return '#ffffff';
    return '#153254'; // Subtle border between standard countries
  };

  const getCountryStrokeWidth = (id) => {
    if (isOperational(id) || isHq(id)) return 1.5;
    return 0.5;
  };

  const countriesData = ${JSON.stringify(countries, null, 2)};

  return (
    <div className="w-full relative">
      <svg
        viewBox="0 0 1010 666"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
      >
        {/* Ocean Background matches the section */}
        <rect x="0" y="0" width="1010" height="666" fill="#06152d" rx="24" />

        {/* Subtle Grid Lines */}
        {[111, 222, 333, 444, 555].map(y => (
          <line 
            key={\`h-\${y}\`} 
            x1="0" 
            y1={y} 
            x2="1010" 
            y2={y} 
            stroke="#102e54" 
            strokeWidth="0.5" 
            strokeDasharray="4,4" 
          />
        ))}
        {[168, 336, 504, 672, 840].map(x => (
          <line 
            key={\`v-\${x}\`} 
            x1={x} 
            y1="0" 
            x2={x} 
            y2="666" 
            stroke="#102e54" 
            strokeWidth="0.5" 
            strokeDasharray="4,4" 
          />
        ))}

        {/* Country Paths */}
        {countriesData.map((country) => {
          const operational = isOperational(country.id);
          const hq = isHq(country.id);
          
          return (
            <path
              key={country.id}
              d={country.d}
              fill={getCountryFill(country.id)}
              stroke={getCountryStroke(country.id)}
              strokeWidth={getCountryStrokeWidth(country.id)}
              strokeLinejoin="round"
              onMouseEnter={() => setHoveredCountry(country.id)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => {
                if (operational && onCountryClick) {
                  onCountryClick(operationalCountries[country.id]);
                }
              }}
              style={{
                transition: 'all 0.2s ease',
                cursor: operational ? 'pointer' : 'default',
              }}
            >
              <title>{country.name}</title>
            </path>
          );
        })}

        {/* Pulse Animations for Regions We Serve */}
        {(() => {
          // Centroids coordinates on 1010 x 666 viewport
          const centroids = [
            { name: "Benin", key: "benin", x: 486.2, y: 394.0 },
            { name: "Nigeria", x: 501.0, y: 386.0 },
            { name: "Cameroon", x: 517.2, y: 401.2 },
            { name: "DR Congo", x: 533.2, y: 432.0 },
            { name: "Ethiopia", x: 573.5, y: 390.0 },
            { name: "Tanzania", x: 570.6, y: 443.0 },
            { name: "HQ Ottawa", x: 268.0, y: 221.0, isHq: true }
          ];

          return centroids.map((c, idx) => (
            <g key={idx} className="pointer-events-none">
              {/* Pulse Ring */}
              <circle 
                cx={c.x} 
                cy={c.y} 
                r="10" 
                fill={c.isHq ? '#ffc72c' : '#f37021'} 
                opacity="0.25"
              >
                <animate attributeName="r" from="6" to="16" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Inner Solid Dot */}
              <circle 
                cx={c.x} 
                cy={c.y} 
                r="3" 
                fill={c.isHq ? '#ffc72c' : '#ffffff'} 
                stroke={c.isHq ? '#ffffff' : '#f37021'} 
                strokeWidth="1.5" 
              />
            </g>
          ));
        })()}
      </svg>
    </div>
  );
};

export default WorldMap;
`;

fs.writeFileSync(outputPath, componentCode, 'utf8');
console.log("Successfully written WorldMap.jsx!");
