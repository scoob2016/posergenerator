import React, { useState } from 'react';

function generateSpeciesFiles(data) {
  return {
    head: "head",
    portraitScale: data.portraitScale,
    portraitTranslation: [data.portraitTranslationX, data.portraitTranslationY, data.portraitTranslationZ],
    profileScale: data.profileScale,
    profileTranslation: [data.profileTranslationX, data.profileTranslationY, data.profileTranslationZ],
    faint: "bedrock(" + data.species + ", faint)",
    cry:  "bedrock(" + data.originalSpecies + ", cry)",
    poses: {
      "battle-idle": {
        poseName: "battle-idle",
        transformTicks: 10,
        poseTypes: ["STAND"],
        isBattle: true,
        isTouchingWater: false,
        animations: ["bedrock(" + data.species + ", battle_idle)"],
        quirks: [
          {
            name: "blink",
            loopTimes: 5,
            minSecondsBetweenOccurrences: 8,
            maxSecondsBetweenOccurrences: 20,
            animations: ["bedrock(" + data.species + ", blink)"]
          }
        ]
      },
      standing: {
        poseName: "standing",
        transformTicks: 10,
        poseTypes: ["STAND", "NONE", "PORTRAIT", "PROFILE"],
        isBattle: false,
        animations: ["look", "bedrock(" + data.species + ", ground_idle)"],
        quirks: [
          {
            name: "blink",
            loopTimes: 5,
            minSecondsBetweenOccurrences: 8,
            maxSecondsBetweenOccurrences: 20,
            animations: ["bedrock(" + data.species + ", blink)"]
          }
        ]
      },
      walking: {
        poseName: "walking",
        transformTicks: 10,
        poseTypes: ["WALK"],
        animations: [
          "look", 
          "bedrock(" + data.species + ", ground_walk)",
          "bedrock(" + data.species + ", ground_idle)"
        ],
        quirks: [
          {
            name: "blink",
            loopTimes: 5,
            minSecondsBetweenOccurrences: 8,
            maxSecondsBetweenOccurrences: 20,
            animations: ["bedrock(" + data.species + ", blink)"]
          }
        ]
      }
    }
  };
}


function App() {
  const [species, setSpecies] = useState('');
  const [originalSpecies, setOriginalSpecies] = useState('');
  const [portraitScale, setPortraitScale] = useState(1.0);
  const [portraitTranslationX, setPortraitTranslationX] = useState(0.0);
  const [portraitTranslationY, setPortraitTranslationY] = useState(0.0);
  const [portraitTranslationZ, setPortraitTranslationZ] = useState(0.0);
  const [profileScale, setProfileScale] = useState(1.0);
  const [profileTranslationX, setProfileTranslationX] = useState(0.0);
  const [profileTranslationY, setProfileTranslationY] = useState(0.0);
  const [profileTranslationZ, setProfileTranslationZ] = useState(0.0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "species":
        setSpecies(value);
        break;
      case "originalSpecies":
        setOriginalSpecies(value);
        break;
      case "portraitScale":
        setPortraitScale(parseFloat(value));
        break;
      case "portraitTranslationX":
        setPortraitTranslationX(parseFloat(value));
        break;
      case "portraitTranslationY":
        setPortraitTranslationY(parseFloat(value));
        break;
      case "portraitTranslationZ":
        setPortraitTranslationZ(parseFloat(value));
        break;
      case "profileScale":
        setProfileScale(parseFloat(value));
        break;
      case "profileTranslationX":
        setProfileTranslationX(parseFloat(value));
        break;
      case "profileTranslationY":
        setProfileTranslationY(parseFloat(value));
        break;
      case "profileTranslationZ":
        setProfileTranslationZ(parseFloat(value));
        break;
      default:
        break;
    }
  };

  const handleDownload = () => {
    const data = {
      species,
      originalSpecies,
      portraitScale,
      portraitTranslationX,
      portraitTranslationY,
      portraitTranslationZ,
      profileScale,
      profileTranslationX,
      profileTranslationY,
      profileTranslationZ
    };

    const speciesData = generateSpeciesFiles(data);
    const jsonData = JSON.stringify(speciesData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'species.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>Scoob's Poser Generator</h1>
      <div className="section">
        <h2>Species</h2>
        <div className="input-group">
          <label>Aspect Species ID:</label>
          <div className="input-container">
            <input
              type="text"
              name="species"
              value={species}
              onChange={handleInputChange}
            />
            <span className="info"> (such as decidueyetot)</span>
          </div>
        </div>
        <div className="input-group">
          <label>Original Species:</label>
          <div className="input-container">
            <input
              type="text"
              name="originalSpecies"
              value={originalSpecies}
              onChange={handleInputChange}
            />
            <span className="info"> (such as decidueye)</span>
          </div>
        </div>
      </div>
      <div className="section">
        <h2>Portrait</h2>
        <div className="input-group">
          <label>Portrait Scale:</label>
          <div className="input-container">
            <input
              type="number"
              name="portraitScale"
              step="0.01"
              value={portraitScale}
              onChange={handleInputChange}
            />
            <span className="info"> (scale of the pokemon icon in party)</span>
          </div>
        </div>
        <div className="input-group">
          <label>Portrait Translation X:</label>
          <div className="input-container">
            <input
              type="number"
              name="portraitTranslationX"
              step="0.01"
              value={portraitTranslationX}
              onChange={handleInputChange}
            />
            <span className="info"> (how far left/right)</span>
          </div>
        </div>
        <div className="input-group">
          <label>Portrait Translation Y:</label>
          <div className="input-container">
            <input
              type="number"
              name="portraitTranslationY"
              step="0.01"
              value={portraitTranslationY}
              onChange={handleInputChange}
            />
            <span className="info"> (how far up/down)</span>
          </div>
        </div>
        <div className="input-group">
          <label>Portrait Translation Z:</label>
          <div className="input-container">
            <input
              type="number"
              name="portraitTranslationZ"
              step="0.01"
              value={portraitTranslationZ}
              onChange={handleInputChange}
            />
            <span className="info"> (how far backwards/forwards)</span>
          </div>
        </div>
      </div>
      <div className="section">
        <h2>Profile</h2>
        <div className="input-group">
          <label>Profile Scale:</label>
          <div className="input-container">
            <input
              type="number"
              name="profileScale"
              step="0.01"
              value={profileScale}
              onChange={handleInputChange}
            />
            <span className="info"> (how large the model appears in pc)</span>
          </div>
        </div>
        <div className="input-group">
          <label>Profile Translation X:</label>
          <div className="input-container">
            <input
              type="number"
              name="profileTranslationX"
              step="0.01"
              value={profileTranslationX}
              onChange={handleInputChange}
            />
            <span className="info"> (how much shifted left/right)</span>
          </div>
        </div>
        <div className="input-group">
          <label>Profile Translation Y:</label>
          <div className="input-container">
            <input
              type="number"
              name="profileTranslationY"
              step="0.01"
              value={profileTranslationY}
              onChange={handleInputChange}
            />
            <span className="info">(how much shifted up/down)</span>
          </div>
        </div>
        <div className="input-group">
          <label>Profile Translation Z:</label>
          <div className="input-container">
            <input
              type="number"
              name="profileTranslationZ"
              step="0.01"
              value={profileTranslationZ}
              onChange={handleInputChange}
            />
            <span className="info">(how much shifted back/forth)</span>
          </div>
        </div>
      </div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}




export default App;
