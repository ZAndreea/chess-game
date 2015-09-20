(function addChessboard () {
	var chessboard = document.getElementById('chess-div');
	var chessboardTable = document.createElement('table');
	chessboardTable.className = 'chessboard-table';

	var tableRow = document.createElement('tr');
	tableRow.className = 'chessboard-index-row';
	chessboardTable.appendChild(tableRow);

	var letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ' '];
	var numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];

	for(i=0; i<10; i++) {
		var tableCell = document.createElement('td');
		tableCell.className = 'chessboard-index-cell';
		tableCell.style.backgroundColor = "white";
		tableRow.appendChild(tableCell);
		tableCell.textContent = letters[i];
	}
	
	for ( i=0; i<8; i++ ) {
		var tableRow = document.createElement('tr');
		tableRow.className = 'chessboard-row';
		chessboardTable.appendChild(tableRow);

		var tableCell = document.createElement('td');
		tableCell.className = 'chessboard-index-cell';
		tableCell.style.backgroundColor = "white";
		tableRow.appendChild(tableCell);
		tableCell.textContent = numbers[i];

		for ( j=0; j<8; j++ ) {

			var tableCell = document.createElement('td');
			tableCell.className = 'chessboard-cell';
			tableCell.id = letters[j+1] + numbers[i] + '-' + 'td';

			tableCell.setAttribute('ondragenter','return dragEnter(event)');
			tableCell.setAttribute('ondragover','return dragOver(event)');
			tableCell.setAttribute('ondrop','return dragDrop(event)');
			tableCell.setAttribute('dropOffBoard','snapback');
			

			tableRow.appendChild(tableCell);

			var span = document.createElement('span');
			span.className = 'chess-piece-span';
			span.id = letters[j+1] + numbers[i] + '-' + 'span';

			span.setAttribute('draggable', 'true');
			span.setAttribute('ondragstart', 'return dragStart(event)');

			tableCell.appendChild(span);

			switch (i) {
				case 1:
					var spanText = document.createTextNode(String.fromCharCode(9823));
					span.appendChild(spanText);
					break;
				case 6:
					var spanText = document.createTextNode(String.fromCharCode(9817));
					span.appendChild(spanText);
					break;
				case 0:
					switch (j) {
						case 0:
						case 7:
							var spanText = document.createTextNode(String.fromCharCode(9820));
							span.appendChild(spanText);

							break;
						case 1:
						case 6:
							var spanText = document.createTextNode(String.fromCharCode(9822));
							span.appendChild(spanText);

							break;
						case 2:
						case 5:
							var spanText = document.createTextNode(String.fromCharCode(9821));
							span.appendChild(spanText);
							break;
						case 3:
							var spanText = document.createTextNode(String.fromCharCode(9819));
							span.appendChild(spanText);
							break;
						case 4:
							var spanText = document.createTextNode(String.fromCharCode(9818));
							span.appendChild(spanText);
							break;
					};
					break;
				case 7:
					switch (j) {
						case 0:
						case 7:
							var spanText = document.createTextNode(String.fromCharCode(9814));
							span.appendChild(spanText);
							break;
						case 1:
						case 6:
							var spanText = document.createTextNode(String.fromCharCode(9816));
							span.appendChild(spanText);
							break;
						case 2:
						case 5:
							var spanText = document.createTextNode(String.fromCharCode(9815));
							span.appendChild(spanText);
							break;
						case 3:
							var spanText = document.createTextNode(String.fromCharCode(9813));
							span.appendChild(spanText);
							break;
						case 4:
							var spanText = document.createTextNode(String.fromCharCode(9812));
							span.appendChild(spanText);
							break;
					};
				break;
			};	
		}

		var tableCell = document.createElement('td');
		tableCell.className = 'chessboard-index-cell';
		tableCell.style.backgroundColor = "white";
		tableRow.appendChild(tableCell);
		tableCell.textContent = numbers[i];
	}

	var tableRow = document.createElement('tr');
	tableRow.className = 'chessboard-index-row';
	chessboardTable.appendChild(tableRow);

	for(i=0; i<10; i++) {
		var tableCell = document.createElement('td');
		tableCell.className = 'chessboard-index-cell';
		tableCell.style.backgroundColor = "white";
		tableRow.appendChild(tableCell);
		tableCell.textContent = letters[i];
	}

	chessboard.appendChild(chessboardTable);

})();
