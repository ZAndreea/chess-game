function dragStart(ev) {
	ev.dataTransfer.effectAllowed = 'move';
	dragStartSpan = document.getElementById(ev.target.getAttribute('id'));
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

	var draggedContent = ev.dataTransfer.getData("Text");
	targetPosition = ev.target.getAttribute('id').replace("-td", "");
	var dragDropSpan = document.getElementById(ev.target.getAttribute('id').replace("td", "span"));

	dragStartSpanNr = dragStartSpan.textContent.charCodeAt(0);
	dragDropSpanNr = dragDropSpan.textContent.charCodeAt(0);

	i++;
	
	if(( i%2 === 1 && colorPiece(dragStartSpanNr) === 'black' ) || ( i%2 === 0 && colorPiece(dragStartSpanNr) === 'white')) {
		alert('Forbidden move - it is not your turn!');
		i--;
		return 0;
	}

	if ( !isNaN(dragDropSpan.textContent.charCodeAt(0)) && colorPiece(dragStartSpanNr) === colorPiece(dragDropSpanNr)) {
		alert('Forbidden move - you cannot attack your own pieces!');
		i--;
		return 0;
	}

	movesCounter();
	turnCounter();

	document.querySelector('.white-moves').textContent = 'Moves so far: ' + whiteMoves;
	document.querySelector('.black-moves').textContent =  'Moves so far: ' + blackMoves;

	capturedPieces();
	trackMoves(dragStartSpanNr);

	dragStartSpan.textContent = '';
	dragDropSpan.textContent = draggedContent;

	ev.preventDefault();
}

whiteMoves = 0;
blackMoves = 0;
kWhite = 0;
kBlack = 0;
i=0;
k=0;

function colorPiece(pieceNr) {
	if ( 9811 < pieceNr && pieceNr < 9818 ) {
		color = 'white';
	}
	if ( 9817 < pieceNr && pieceNr < 9824 ) {
		color = 'black';
	}
	return color;
}

function turnCounter() {
	if( i%2 === 0 ) {
		document.querySelector('.white-turn').textContent =  'Your turn!';
		document.querySelector('.black-turn').textContent =  'Not your turn';
	} else {
		document.querySelector('.white-turn').textContent =  'Not your turn';
		document.querySelector('.black-turn').textContent =  'Your turn!';
	}
}

function movesCounter() {
	if( colorPiece(dragStartSpanNr) == 'white' ) {
		whiteMoves++;
	} else if ( colorPiece(dragStartSpanNr) == 'black' ) {
		blackMoves++;
	}
}

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
			var cText = 'Captured pieces: ' + kWhite;
		} else {
			kBlack++;
			var cText = 'Captured pieces: ' + kBlack;
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

function trackMoves(nr) {

	var piece;

	switch(nr) {
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

	li.textContent = 'Player ' + colorPiece(dragStartSpan) + ' moved ' + piece + ' at ' + targetPosition;
	document.getElementById(moveId).appendChild(li);
}
