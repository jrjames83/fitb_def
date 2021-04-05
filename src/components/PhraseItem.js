import React from "react";



export default function PhraseItem(props) {

    const onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();        
    }

    const onDrop = (e, tokenIndex) => {
        e.preventDefault();
        const droppedItem = e.dataTransfer.getData("drag-item");
        if (droppedItem) {
            if (droppedItem == tokenIndex) {
                console.log(droppedItem, 'Was correctly dropped onto', tokenIndex)
                props.updatePhraseMask(tokenIndex)

            }
        }
    }

  const renderPhraseToken = (token, activeToken) => {
    // restrict to the activeIndex
      let tokenText = token.mask ? '_____________' : token.text
      let className = (token.mask && token.tokenIndex == activeToken)? 'flex-item wrap dashed pulser' : 'flex-item wrap'
      return (
        <div 
            onDragOver={(e) => onDragOver(e, props.tokenIndex)} 
            onDrop={(e) => onDrop(e, props.tokenIndex)}
            onDragEnter={(e) => e.preventDefault()}
            draggable 
            className={className}>
          {" "}
          <p className="token">{tokenText}</p>
        </div>
      );
    }
  return renderPhraseToken(props.token, props.activeToken);
}
