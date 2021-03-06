function getLines() {
  return [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
}
export function getWinningSquares(squares: Square[]) {
  const lines = getLines();
  for (let i = 0, len = lines.length; i < len; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, c];
    }
  }
}
export function canComputerWin(squares: Square[]) {
  const lines = getLines();
  for (let i = 0, len = lines.length; i < len; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] !== "X" && squares[b] !== "X" && squares[c] !== "X") {
      return true;
    }
  }
  return false;
}

export function winLineStyle(squares: Square[]) {
  let winnerSquares = getWinningSquares(squares);
  let lineStyle: Partial<lineStyle> = {};
  if (!winnerSquares) {
    return undefined;
  } else {
    const start = winnerSquares[0];
    const end = winnerSquares[1];
    const thickness = "4%";
    const length = "90%";
    const margin = ((100 - parseInt(length)) / 2).toString() + "%";
    const lineDirection = getLineDirection(start, end);

    switch (lineDirection) {
      case "horizontal":
        const topOffset = 1 + (start / 3) * 2;
        lineStyle.top = `calc(100%*${topOffset}/6 - ${thickness}/2)`;
        lineStyle.left = margin;
        lineStyle.width = length;
        lineStyle.height = thickness;
        lineStyle.transform = "rotate(0deg)"; // Yeah, 0deg, that fixes a tearing issue
        break;
      case "vertical":
        const leftOffset = 1 + start * 2;
        lineStyle.left = `calc(100%*${leftOffset}/6)`;
        lineStyle.top = `calc(${margin} - ${thickness}/2)`;
        lineStyle.width = length;
        lineStyle.height = thickness;
        lineStyle.transform = "rotate(90deg)";
        break;
      case "diagonal":
        lineStyle.top = `calc(8% - ${thickness}/2)`;
        lineStyle.width = "120%";
        lineStyle.height = thickness;
        if (start === 0) {
          lineStyle.left = "8%";
          lineStyle.transform = "rotate(45deg)";
        } else {
          lineStyle.left = "92%";
          lineStyle.transform = "rotate(135deg)";
        }
        break;
      default:
        break;
    }

    return lineStyle;
  }
}
function getLineDirection(start: number, end: number) {
  if (start % 3 === end % 3) {
    return "vertical";
  } else if (Math.floor(start / 3) === Math.floor(end / 3)) {
    return "horizontal";
  } else {
    return "diagonal";
  }
}
