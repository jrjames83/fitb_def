import React from "react";

export default function SelectListItem(props) {


  const handleDragStart = (e, token) => {
    e.dataTransfer.setData('drag-item', token)
    e.stopPropagation();
    console.log(e.dataTransfer)
    console.log("dragging started", e.target, token);
  };

  const handleClick = (e, token) => {
    // console.log(token.tokenIndex, 'was the clicked tokenIndex')
    console.log('the active token is', props.activeToken)
    if (token.tokenIndex == props.activeToken) {
      props.updatePhraseToken(token.tokenIndex)
    }
  }

  const renderListToken = (token) => {
    if (token.mask) {
      return (
        <div
          onClick={(e) => handleClick(e, token)}
          draggable
          onDragStart={(e) => handleDragStart(e, token.tokenIndex)}
          className="flex-item-dragtotop"
          tokenidx={token.tokenIndex}
        >
          <div className="token">{token.token}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  return renderListToken(props.token);
}
