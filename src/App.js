import "./App.css";
import { useState } from "react";
import PhraseItem from "./components/PhraseItem";
import SelectListItem from "./components/SelectListItem";

// https://css-tricks.com/almanac/properties/f/flex-wrap/
// https://www.pluralsight.com/guides/drag-and-drop-react-components

function App() {
  // create multiple definitions and do the shoot
  const phrase = {
    fullTerm: "Sister chromatids",
    fullDef:
      "Two identical strands joined by a common centromere as a result of a chromosome that duplicated during the S phase of the cell cycle",
    tokens: [
      { token: "Two", mask: false },
      { token: "identical", mask: false },
      { token: "strands", mask: true },
      { token: "joined", mask: false },
      { token: "by", mask: false },
      { token: "a", mask: false },
      { token: "common", mask: false },
      { token: "centromere", mask: true },
      { token: "as", mask: false },
      { token: "a", mask: false },
      { token: "result", mask: false },
      { token: "of", mask: false },
      { token: "a", mask: false },
      { token: "chromosome", mask: true },
      { token: "that", mask: false },
      { token: "duplicated", mask: false },
      { token: "during", mask: false },
      { token: "the", mask: false },
      { token: "S", mask: false },
      { token: "phase", mask: false },
      { token: "of", mask: false },
      { token: "the", mask: false },
      { token: "cell", mask: false },
      { token: "cycle", mask: false },
    ],
  };

  const [phrases, setPhrases] = useState(phrase.tokens);

  const updatePhraseToken = (tokenId) => {
    let newArr = [...phrases]; 
    newArr[tokenId].mask = false;
    setPhrases(newArr)
  
  }

  return (
    <div className="App">
      <header>
        <h1>{phrase.fullTerm}</h1>
      </header>
      <div className="flex-container wrap">
        {phrases.map((token, tokenIndex) => (
          <div draggable className="flex-item wrap">
            <PhraseItem token={token} tokenIndex={tokenIndex} updatePhraseMask={updatePhraseToken}/>
          </div>
        ))}
      </div>

      <div className="flex-container nowrap">
        <ul>
          {phrases.map((token, tokenIndex) => (
            <SelectListItem token={token} tokenIndex={tokenIndex} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
