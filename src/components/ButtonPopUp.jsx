import React from "react";

export default function ButtonPopUp({
  position: { x, y },
  onClick,
  color,
  width,
}) {
  const boxWidth = Math.max(80, width * 0.4);
  const boxX = x + (width - boxWidth) / 2;
  const boxY = y + 30;

  return (
    <button
      className={`fixed w-[${boxWidth}px] right-[${boxX}px] top-[${boxY}px]`}
      onClick={onClick}
    >
      ButtonPopUp
    </button>
  );
}
