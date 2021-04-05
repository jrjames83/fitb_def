import {React, useState} from "react";
import { Shake } from 'reshake';

export default function SelectListItem(props) {

  const [shaking, setShaking] = useState(false);


  const handleDragStart = (e, token) => {
    e.dataTransfer.setData('drag-item', token)
    e.stopPropagation();
    console.log(e.dataTransfer)
    console.log("dragging started", e.target, token);
  };

  // what if I have state that says render a shake component or a regular component?
  // and upon getting it incorrect, I change the state to render a shake component, then after 1 second
  // re-render a regular component. 

  const handleClick = (e, token) => {
    // console.log(token.tokenIndex, 'was the clicked tokenIndex')
    console.log('the active token is', props.activeToken)
    if (token.tokenIndex == props.activeToken) {
      setShaking(false);
      props.updatePhraseToken(token.tokenIndex)
    } else {
      console.log('need to shake the component')
      setShaking(!shaking)
      setTimeout(() => setShaking(!shaking), 200)
    }
  }

  const renderListToken = (token) => {
    if (token.mask) {
      return (
        <Shake
          h={50}
          v={5}
          r={3}
          dur={300}
          int={0.6}
          max={16}
          q={1}
          fixed={false}
          trigger={false}
          fixedStop={true}
          active={shaking}
          freez={false}
          onClick={  (e) => {handleClick(e, token)}}
          draggable
          onDragStart={(e) => handleDragStart(e, token.tokenIndex)}
          className="flex-item-dragtotop"
          tokenidx={token.tokenIndex}
          >
          <div className="token">{token.text}</div>
        </Shake>
      );
    } else {
      return null;
    }
  };

  return renderListToken(props.token);
}
