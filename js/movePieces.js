whiteMoves = 0;
blackMoves = 0;
kWhite = 0;
kBlack = 0;
i=0;
k=0;
m = [['b-r','b-kn','b-b','b-q','b-ki','b-b','b-kn','b-r'],
	['b-p','b-p', 'b-p','b-p','b-p', 'b-p','b-p', 'b-p'],
	['0','0', '0','0','0', '0','0', '0'],
	['0','0', '0','0','0', '0','0', '0'],
	['0','0', '0','0','0', '0','0', '0'],
	['0','0', '0','0','0', '0','0', '0'],
	['w-p','w-p', 'w-p','w-p','w-p', 'w-p','w-p', 'w-p'],
	['w-r','w-kn','w-b','w-q','w-ki','w-b','w-kn','w-r']];

function dragStart(ev) {
	ev.dataTransfer.effectAllowed = 'move';
	dragStartSpan = document.getElementById(ev.target.getAttribute('id'));
	dragStartSpanId = ev.target.getAttribute('id');
	ev.dataTransfer.setData("Text", dragStartSpan.textContent);
	return true;
}
function dragEnter(ev) {
	dragStartSpan.style.color = "red";
	event.preventDefault();
	return true;
}
function dragOver(ev) {
	return false;
}
function dragDrop(ev) {
	dragStartSpan.style.color = "black";
	dragDropSpanId = ev.target.getAttribute('id');
	draggedContent = ev.dataTransfer.getData("Text");
	dropPosition = ev.target.getAttribute('id').replace("-td", "");
	dragDropSpan = document.getElementById(ev.target.getAttribute('id').replace("td", "span"));
	dragStartSpanNr = dragStartSpan.textContent.charCodeAt(0);
	dragDropSpanNr = dragDropSpan.textContent.charCodeAt(0);

	//check if the move is legal
	if(legalMoves() === false) {
		return 0;
	}

	i++; //increase the moves number

	movesCounter(); //update the 'moves so far' number
	turnCounter(); //update whose turn it is
	capturedPieces(); //update the pieces each player has captured so far
	trackMoves(); //update moves list

	dragStartSpan.textContent = ''; //remove the piece from its initial place
	dragDropSpan.textContent = draggedContent; //add the piece to the final place

	//update the matrix as well
	m[i1][j1] = '0'; 
	m[i2][j2] = movedPiece;

	ev.preventDefault();
}
//returns the color of the piece considering the unicode of it
function colorPiece(pieceNr) {
	if ( 9811 < pieceNr && pieceNr < 9818 ) {
		color = 'white';
	}
	if ( 9817 < pieceNr && pieceNr < 9824 ) {
		color = 'black';
	}
	return color;
}
//update whose turn it is
function turnCounter() {
	if( i%2 === 0 ) {
		document.querySelector('.white-turn').textContent =  'Your turn!';
		document.querySelector('.black-turn').textContent =  'Not your turn';
	} else {
		document.querySelector('.white-turn').textContent =  'Not your turn';
		document.querySelector('.black-turn').textContent =  'Your turn!';
	}
}
//update the 'moves so far' number
function movesCounter() {
	if( colorPiece(dragStartSpanNr) == 'white' ) {
		whiteMoves++;
	} else if ( colorPiece(dragStartSpanNr) == 'black' ) {
		blackMoves++;
	}
	document.querySelector('.white-moves').textContent = 'Moves so far: ' + whiteMoves;
	document.querySelector('.black-moves').textContent =  'Moves so far: ' + blackMoves;
}
//update the pieces each player has captured so far; add pieces to the coresponding p and count them
function capturedPieces() {
	if( dragDropSpanNr > 0 ) {
		var capturePiecesId = colorPiece(dragStartSpanNr) + "-captured-pieces-p";
		var capturePiecesP = document.getElementById(capturePiecesId);
		var pText = document.createTextNode(String.fromCharCode(dragDropSpanNr));
		capturePiecesP.appendChild(pText);
		var capturedPiecesCounterId = colorPiece(dragStartSpanNr) + "-piece-number";
		var capturedPiecesCounter = document.getElementById(capturedPiecesCounterId);
		
		if(colorPiece(dragStartSpanNr) === 'white') {
			kWhite++;
			var cText = 'White captured pieces: ' + kWhite;
		} else {
			kBlack++;
			var cText = 'Black captured pieces: ' + kBlack;
		}
		capturedPiecesCounter.textContent = cText;

		if(kWhite === 10 && colorPiece(dragDropSpanNr) === 'black') {
			document.getElementById('white-captured-pieces-p').appendChild(document.createElement('br'));
		}
		if(kBlack === 10 && colorPiece(dragDropSpanNr) === 'white') {
			document.getElementById('black-captured-pieces-p').appendChild(document.createElement('br'));
		}
	}
}
//track the moves of each player
function trackMoves() {
	var piece;
	switch(dragStartSpanNr) {
		case 9812:
		case 9818:
			piece = 'king';
			break;
		case 9813:
		case 9819:
			piece = 'queen';
			break;
		case 9814:
		case 9820:
			piece = 'rook';
			break;
		case 9815:
		case 9821:
			piece = 'bishop';
			break;
		case 9816:
		case 9822:
			piece = 'knight';
			break;
		case 9817:
		case 9823:
			piece = 'pawn';
			break;
	}
	moveId = colorPiece(dragStartSpan) + '-ul';
	var li = document.createElement('li');

	li.textContent = 'Player ' + colorPiece(dragStartSpan) + ' moved ' + piece + ' at ' + dropPosition;
	document.getElementById(moveId).appendChild(li);
}
//legal moves
function legalMoves() {
	//get the i and j coordinates of the moved piece by modifying the string of its id
	i1 = 7 - (dragStartSpanId[1] - 1);
	j1 = dragStartSpanId.charCodeAt(0) - 65;

	//get the i and j coordinates of the target position by modifying the string of its id
	i2 = 7 - (dragDropSpanId[1] - 1);
	j2 = dragDropSpanId.charCodeAt(0) - 65;

	//get the piece and the targeted position from the matrix in a variable
	movedPiece = m[i1][j1];
	targetPosition = m[i2][j2];

	//if it's not your turn, the move is not allowed
	if(( i%2 === 0 && colorPiece(dragStartSpanNr) === 'black' ) || ( i%2 === 1 && colorPiece(dragStartSpanNr) === 'white')) {
		return false;
	}
	//capturing a piece of your own color is not allowed
	if ( !isNaN(dragDropSpan.textContent.charCodeAt(0)) && colorPiece(dragStartSpanNr) === colorPiece(dragDropSpanNr)) {
		return false;
	}
	//black pawn moves only one position down, and two positions down if it's the first move of the piece; it attacks only diagonally
	if(movedPiece === 'b-p') {
		if(targetPosition === '0') {
			if( (i2 != i1 + 2 && j1 != j2) || (i2 != i1 + 1 && j1 != j2) ) {
				return false;
			}
			if( m[i1][1] != 'b-p' && ( i2 != i1 + 1 || j1 != j2 ) ) {
				return false;
			} 
		} else if( i2 - i1 != 1 ||  Math.abs(j1-j2)!= 1 ) {
			return false;
		}
	}
	//white pawn moves only one position up, and two positions up if it's the first move of the piece; it attacks only diagonally
	if(movedPiece === 'w-p') {
		if(targetPosition === '0') {
			if( (i2 != i1 - 2 && j1 != j2) || (i2 != i1 - 1 && j1 != j2) ) {
				return false;
			}
			if( m[i1][6] != 'w-p' && ( i2 != i1 - 1 || j1 != j2 ) ) {
				return false;
			}
		} else if( i1 - i2 != 1 ||  Math.abs(j1 - j2)!= 1 ) {
			return false;
		}
	}
	//rook moves straight, only when one coordinate changes and the other stays the same
	if(movedPiece === 'b-r' || movedPiece === 'w-r') {
		if( !( ( i1 === i2 && j1 != j2 ) || ( j1 === j2 && i1 != i2 ) ) ) {
			return false;
		}
	}
	//bishop moves only diagonally, when the j coordinate is increased by the same number that the i coordinate is
	if(movedPiece === 'b-b' || movedPiece === 'w-b') {
		if ( Math.abs(i1 - i2) != Math.abs(j1 - j2) ) {
			return false;
		}
	}
	//knight moves in the L shape, when one coordinate changes by one and the other by two
	if(movedPiece === 'b-kn' || movedPiece === 'w-kn') {
		if ( !((Math.abs(i2 - i1) === 1 &&  Math.abs(j2 - j1) === 2 ) || (Math.abs(i2 - i1) === 2 &&  Math.abs(j2 - j1) === 1 ))) {
			return false;
		}
	}
	//queen moves the same as the bishop and rook combined, diagonally and straight
	if(movedPiece === 'b-q' || movedPiece === 'w-q') {
		if ( ( Math.abs(i1 - i2) != Math.abs(j1 - j2) ) && !( ( i1 === i2 && j1 != j2 ) || ( j1 === j2 && i1 != i2 ) ) ) {
			return false;
		}
	}
	//king moves only one position around it, when the coordinates change by one
	if(movedPiece === 'b-ki' || movedPiece === 'w-ki') {
		if ( Math.abs(i1 - i2) != 1 && Math.abs(j1 - j2) != 1 ) {
			return false;
		}
	}
}
