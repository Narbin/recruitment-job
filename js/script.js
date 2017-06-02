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
	app.table.AddNewLine(newLine);
	app.table.AddNewLineDOM(newLine);
});

function Table() {
	this.lines = [ ];
}

Table.prototype.AddNewLine = function (_line) {
	this.lines.push(_line);
};

Table.prototype.AddNewLineDOM = function (_line) {
	
	var table = document.getElementById('appTable').getElementsByTagName('tbody')[0],
		newRow = table.insertRow(table.rows.length),
		cellForIcons = newRow.insertCell();

	var pencilIcon = document.createElement('img');
	pencilIcon.className = 'icon';
	pencilIcon.src = 'icons/pencil.svg';

	var binIcon = document.createElement('img');
	binIcon.className = 'icon';
	binIcon.src = 'icons/trash-can.svg';

	var saveIcon = document.createElement('img');
	saveIcon.className = 'icon hide';
	saveIcon.src = 'icons/save.svg';

	for (var i = 0; i < _line.cells.length; i++) {
		var newCell = newRow.insertCell(i),
			div = document.createElement('div'),
			newText = document.createTextNode(_line.cells[i].content);
		div.appendChild(newText);
		newCell.appendChild(div);
	}

	saveIcon.onclick = function () {
		var cell = this.parentNode.parentNode;

		for (var i = 0; i < cell.childNodes.length - 1; i++) {
			var text = document.createTextNode(cell.childNodes[i].childNodes[0].value),
				div = document.createElement('div');

			app.table.lines[app.table.lines.indexOf(_line)].cells[i].content = cell.childNodes[i].childNodes[0].value;
			div.appendChild(text);
			cell.childNodes[i].replaceChild(div, cell.childNodes[i].childNodes[0]);
		}

		this.classList.toggle('hide');
		this.parentNode.childNodes[0].classList.toggle('hide');
	};

	pencilIcon.onclick = function () {
		var cell = this.parentNode.parentNode;

		for (var i = 0; i < cell.childNodes.length - 1; i++) {
			var input = document.createElement('input');
			input.type = 'text';
			input.value = cell.childNodes[i].childNodes[0].textContent;

			cell.childNodes[i].replaceChild(input, cell.childNodes[i].childNodes[0]);
		}

		this.classList.toggle('hide');
		this.parentNode.childNodes[1].classList.toggle('hide');
	};

	binIcon.onclick = function () {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
		app.table.lines.splice(app.table.lines.indexOf(_line), 1);
	};
	
	cellForIcons.appendChild(pencilIcon);
	cellForIcons.appendChild(saveIcon);
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
