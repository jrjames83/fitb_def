import React from "react";

export default function SelectListItem(props) {


  const handleDragStart = (e, token) => {
    e.dataTransfer.setData('drag-item', token)
    e.stopPropagation();
    console.log(e.dataTransfer)
    console.log("dragging started", e.target, token);
    
  };

  const renderListToken = (token) => {
    if (token.mask) {
      return (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, token.tokenIndex)}
          className="flex-item-dragtotop nowrap"
          tokenidx={token.tokenIndex}
        >
          <li className="token">{token.token}</li>
        </div>
      );
    } else {
      return null;
    }
  };

  return renderListToken(props.token);
}
