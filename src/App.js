import "./App.css";
import { useState, useEffect, useMemo } from "react";
import PhraseItem from "./components/PhraseItem";
import SelectListItem from "./components/SelectListItem";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// https://css-tricks.com/almanac/properties/f/flex-wrap/
// https://www.pluralsight.com/guides/drag-and-drop-react-components


function App() {

  const [phrases, setPhrases] = useState(null);
  const [doneLoading, setdoneLoading] = useState(false);
  const [termIndex, setTermIndex] = useState(0);
  const [activeToken, setActiveToken] = useState(null);

  useEffect(async () => {
    const response = await fetch('http://localhost:5000/api/v1');
    const data = await response.json();
    setPhrases(data)
    setActiveToken(data[termIndex].activeIndex)
    setdoneLoading(!doneLoading)
    console.log(data)
  }, [])

  const [quizSolved, setQuizSolved] = useState(false);
  const [pointsWon, setPointsWon] = useState(0);

  const getActiveToken = (tokens) => {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].mask === true) {
        return i;
      }
    }
  };  

  useEffect(() => {
      setQuizSolved(false);
      if (doneLoading) {
        setActiveToken(getActiveToken(phrases[termIndex].tokens))
      }
  }, [termIndex]);


  const isSolved = () => {
    let solvedState =
      phrases[termIndex].tokens.filter((x) => x.mask === false).length ==
        phrases[termIndex].tokens.length;
    console.log(solvedState, "is the solved state");
    if (solvedState) {
      setQuizSolved(true);
      console.log("Quiz is solved");
      setPointsWon(pointsWon + 1);
    }
  };

  const nextButton = (e) => {
    setTermIndex((oldTermIndex) => oldTermIndex + 1);
  };

  const updatePhraseToken = (tokenId) => {
    console.log('called updatePhrase token with', tokenId)
    setPhrases(
      phrases.map((p, i) => {
        if (termIndex === i) {
          let tempObj = p;
          tempObj.tokens[tokenId].mask = false;
          // update the shuffled Blank object as well. 
          tempObj.shuffledBlanks.map(blank => {
            if (blank.tokenIndex == tokenId) {
              blank.mask = false;
            }
          })
          return tempObj;
        } else {
          return p;
        }
      })
    );

    isSolved();
    // Advance the active token to focucs the user on what to fill in next
    setActiveToken(getActiveToken(phrases[termIndex].tokens));
  };


  return (
    <Container className="_body">
      <div className="App">
        <header>
          <div className="points">Pop Quiz Points: {pointsWon}</div>
          <h1>concept: <span className="concept">{doneLoading && phrases[termIndex].fullTerm}</span></h1>
        </header>
        <Row>
          <div className="flex-container wrap">
            {doneLoading && phrases[termIndex].tokens.map((token, tokenIndex) => (
              <div draggable className="flex-item">
                <PhraseItem
                  token={token}
                  tokenIndex={token.tokenIndex}
                  activeToken={activeToken}
                  updatePhraseMask={updatePhraseToken}
                />
              </div>
            ))}
          </div>
        </Row>

        
        <Row className="p-2">
          <div className="flex-container wrap">
            {doneLoading &&
              phrases[termIndex].shuffledBlanks
                  .map((token, tokenIndex) => (
              <SelectListItem
                token={token}
                className="flex-item-blank"
                updatePhraseToken={updatePhraseToken}
                tokenIndex={token.tokenIndex}
                activeToken={activeToken}
              />
            ))}
            {quizSolved ? (
              <button onClick={(e) => nextButton(e)}>Next challenge</button>
            ) : null}
          </div>
        </Row>
      </div>
    </Container>
  );
}

export default App;
