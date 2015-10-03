// Code goes here

var turn;

var board;

var winner;

function resetGame() {
  turn = 0;
  winner = undefined;
  board = [
    [ ' ', ' ', ' '],
    [ ' ', ' ', ' '],
    [ ' ', ' ', ' ']
  ];
  var table = document.getElementById('board');
  for (var col = 0; col < 3; col++) {
    for (var row = 0; row < 3; row++) {
      var cell = table.rows[row].cells[col];
      cell.innerHTML  = ' ';
    }
  }
  document.getElementById('result').innerHTML = '';
}

function makeMove(col, row) {
  if (board[row][col] === ' ' && !winner) {
    var table = document.getElementById('board');
    var cell = table.rows[row].cells[col];
    var player = turn % 2 == 0 ? 'X' : 'O';
    cell.innerHTML = board[row][col] = player;
    if (isWinner(player)) {
      document.getElementById('result').innerHTML = 'The winner is ' + player;
      winner = player;
    }
    turn++;
    if (turn === 9 && !winner) {
      document.getElementById('result').innerHTML = 'The game is deadlocked';
    }
  }
}

function countCells(check, player) {
  var count = 0;
  var row = check.row;
  var col = check.col;
  for (var i = 0; i < 3; i++) {
    if (board[row][col] === player) {
      count++;
    }
    col += check.colinc;
    row += check.rowinc;
  }
  return count;
}

function isWinner(player) {
  var checks = [
    { col: 0, row: 0, colinc: 1, rowinc: 0 },
    { col: 0, row: 1, colinc: 1, rowinc: 0 },
    { col: 0, row: 2, colinc: 1, rowinc: 0 },
    { col: 0, row: 0, colinc: 0, rowinc: 1 },
    { col: 1, row: 0, colinc: 0, rowinc: 1 },
    { col: 2, row: 0, colinc: 0, rowinc: 1 },
    { col: 0, row: 0, colinc: 1, rowinc: 1 },
    { col: 2, row: 0, colinc: -1, rowinc: 1 }
  ];
  for (var i = 0; i < checks.length; i++) {
    if (countCells(checks[i], player) === 3) {
      return true;
    }
  }
  return false;
}
