import "./App.css";
import { useState, useEffect } from "react";
import PhraseItem from "./components/PhraseItem";
import SelectListItem from "./components/SelectListItem";

// https://css-tricks.com/almanac/properties/f/flex-wrap/
// https://www.pluralsight.com/guides/drag-and-drop-react-components

function App() {
  // create multiple definitions and do the shoot

  const phrase = [
    {
      fullTerm: "Sister chromatids",
      fullDef:
        "Two identical strands joined by a common centromere as a result of a chromosome that duplicated during the S phase of the cell cycle",
      tokens: [
        { token: "Two", mask: false, tokenIndex: 0 },
        { token: "identical", mask: true, tokenIndex: 1 },
        { token: "strands", mask: false, tokenIndex: 2 },
        { token: "joined", mask: false, tokenIndex: 3 },
        { token: "by", mask: false, tokenIndex: 4 },
        { token: "a", mask: false, tokenIndex: 5 },
        { token: "common", mask: false, tokenIndex: 6 },
        { token: "centromere", mask: true, tokenIndex: 7 },
        { token: "as", mask: false, tokenIndex: 8 },
        { token: "a", mask: false, tokenIndex: 9 },
        { token: "result", mask: false, tokenIndex: 10 },
        { token: "of", mask: false, tokenIndex: 11 },
        { token: "a", mask: false, tokenIndex: 12 },
        { token: "chromosome", mask: false, tokenIndex: 13 },
        { token: "that", mask: false, tokenIndex: 14 },
        { token: "duplicated", mask: true, tokenIndex: 15 },
        { token: "during", mask: false, tokenIndex: 16 },
        { token: "the", mask: false, tokenIndex: 17 },
        { token: "S", mask: false, tokenIndex: 18 },
        { token: "phase", mask: false, tokenIndex: 19 },
        { token: "of", mask: false, tokenIndex: 20 },
        { token: "the", mask: false, tokenIndex: 21 },
        { token: "cell", mask: true, tokenIndex: 22 },
        { token: "cycle", mask: false, tokenIndex: 23 },
      ],
    },
    {
      fullTerm: "Sister chromatids",
      fullDef:
        "Sister chromatids are two identical copies of the same chromosome formed by DNA replication, attached to each other by a structure called the centromere. During cell division, they are separated from each other, and each daughter cell receives one copy of the chromosome.",
      tokens: [
        { token: "Sister", mask: false, tokenIndex: 0 },
        { token: "chromatids", mask: false, tokenIndex: 1 },
        { token: "are", mask: false, tokenIndex: 2 },
        { token: "two", mask: false, tokenIndex: 3 },
        { token: "identical", mask: true, tokenIndex: 4 },
        { token: "copies", mask: false, tokenIndex: 5 },
        { token: "of", mask: false, tokenIndex: 6 },
        { token: "the", mask: true, tokenIndex: 7 },
        { token: "same", mask: false, tokenIndex: 8 },
        { token: "chromasome", mask: false, tokenIndex: 9 },
        { token: "formed", mask: false, tokenIndex: 10 },
        { token: "by", mask: false, tokenIndex: 11 },
        { token: "DNA", mask: false, tokenIndex: 12 },
        { token: "replication", mask: true, tokenIndex: 13 },
        { token: "attached", mask: false, tokenIndex: 14 },
        { token: "to", mask: true, tokenIndex: 15 },
        { token: "each", mask: false, tokenIndex: 16 },
        { token: "other", mask: false, tokenIndex: 17 },
        { token: "by", mask: false, tokenIndex: 18 },
        { token: "a", mask: false, tokenIndex: 19 },
        { token: "structure", mask: false, tokenIndex: 20 },
        { token: "called", mask: false, tokenIndex: 21 },
        { token: "the", mask: true, tokenIndex: 22 },
        { token: "centromere.", mask: true, tokenIndex: 23 },
        { token: "During", mask: false, tokenIndex: 24 },
        { token: "cell", mask: false, tokenIndex: 25 },
        { token: "division", mask: true, tokenIndex: 26 },
        { token: "they", mask: false, tokenIndex: 27 },
        { token: "are", mask: false, tokenIndex: 28 },
        { token: "separated", mask: false, tokenIndex: 29 },
        { token: "from", mask: false, tokenIndex: 30 },
        { token: "each", mask: false, tokenIndex: 31 },
        { token: "other", mask: false, tokenIndex: 32 },
        { token: "and", mask: false, tokenIndex: 33 },
        { token: "each", mask: false, tokenIndex: 34 },
        { token: "daughter", mask: false, tokenIndex: 35 },
        { token: "cell", mask: false, tokenIndex: 36 },
        { token: "receives", mask: true, tokenIndex: 37 },
        { token: "one", mask: false, tokenIndex: 38 },
        { token: "copy", mask: false, tokenIndex: 39 },
        { token: "of", mask: false, tokenIndex: 40 },
        { token: "the", mask: false, tokenIndex: 41 },
        { token: "chromosome", mask: false, tokenIndex: 42 },
      ],
    },    
  ];  

  const [termIndex, setTermIndex] = useState(0);
  const [quizSolved, setQuizSolved] = useState(false);
  const [pointsWon, setPointsWon] = useState(0);
  // const [phrases, setPhrases] = useState(phrase[termIndex].tokens);
  const [phrases, setPhrases] = useState(phrase);

  // Similar to componentDidMount and componentDidUpdate:


  // How to know if it's solved?
  const isSolved = () => {
    let solvedState =
      phrases[termIndex].tokens.filter(x => x.mask === false).length == phrases[termIndex].tokens.length;
      console.log(solvedState, 'is the solved state')
      if (solvedState) {
        setQuizSolved(true);
        console.log('Quiz is solved')
        setPointsWon(pointsWon + 1)
      }  
  };

  const nextButton = () => {
    setTermIndex(termIndex + 1)
    console.log(termIndex, 'is the term index')
    setQuizSolved(false)
  };

  const updatePhraseToken = (tokenId) => {
    setPhrases(
      phrases.map((p, i) => {
        if (termIndex == i) {
          let tempObj = p; 
          tempObj.tokens[tokenId].mask = false;
          return tempObj
        } else {
          return p
        }
      })
    )
    isSolved()
  };

  return (
    <div className="App">
      <header>
        <div className="points">Pop Quiz Points: {pointsWon}</div>
        <h1>{phrase[termIndex].fullTerm}</h1>
      </header>
      <div className="flex-container wrap">
        {phrases[termIndex].tokens.map((token, tokenIndex) => (
          <div draggable className="flex-item wrap">
            <PhraseItem
              token={token}
              tokenIndex={token.tokenIndex}
              updatePhraseMask={updatePhraseToken}
            />
          </div>
        ))}
      </div>

      <div className="flex-container nowrap">
        <ul>
          {phrases[termIndex].tokens.map((token, tokenIndex) => (
            <SelectListItem token={token} tokenIndex={token.tokenIndex} />
          ))}
        </ul>
        {quizSolved ? (
          <button onClick={() => nextButton()}>Next challenge</button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
