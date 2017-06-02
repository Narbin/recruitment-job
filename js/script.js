'use strict';

var app = {
	table: new Table()
};

document.getElementById('addNewC').addEventListener('click', function () {
	var newLine = new Line(
		document.getElementById('column1').value,
		document.getElementById('column2').value,
		document.getElementById('column3').value,
		document.getElementById('column4').value
		);
	app.table.addNewLineDOM(newLine);
});

function Table() {
	this.lines = [ ];
}

Table.prototype.addNewLine = function (_line) {
	this.lines.push(_line);
};

Table.prototype.addNewLineDOM = function (_line) {
	
	var table = document.getElementById('appTable').getElementsByTagName('tbody')[0],
		newRow = table.insertRow(table.rows.length),
		cellForIcons = newRow.insertCell();

	var pencilIcon = document.createElement('img');
	pencilIcon.className = 'icon';
	pencilIcon.src = 'icons/pencil.svg';
	pencilIcon.id = 'line' + _line.id;

	var binIcon = document.createElement('img');
	binIcon.className = 'icon';
	binIcon.src = 'icons/trash-can.svg';
	binIcon.id = 'line' + _line.id;

	for (var i = 0; i < _line.cells.length; i++) {
		var newCell = newRow.insertCell(i);
		var newText = document.createTextNode(_line.cells[i].content);
		newCell.appendChild(newText);
	}
	
	cellForIcons.appendChild(pencilIcon);
	cellForIcons.appendChild(binIcon);
};

var Line = (function () {
	var nextId = 1;

	return function Line() {
		this.cells = [ ];
		this.id = nextId++;
		for (var i = 0; i < arguments.length; i++) {
			this.cells.push(new Cell(arguments[i]));
		}
	};
})();

function Cell(_content) {
	this.content = _content;
}
