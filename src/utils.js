import React from 'react'; // 引入 React 嚟用 JSX (雖然呢個 function 唔再直接回傳 JSX，但如果其他地方有用 React，呢行可以保留)

export const getSocialIcon = (url) => {
  // 根據你的要求，無論係咩 URL，都唔再回傳 SVG
  // 如果你希望顯示文字，可以回傳 "" (空字串)
  // 如果你希望完全唔顯示任何嘢，就回傳 null
  return null;
};

export const getContrastColor = (hexcolor) => {
  if (!hexcolor) return "#000000"; // Default to black if no color
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF"; // Return black for light backgrounds, white for dark
};
