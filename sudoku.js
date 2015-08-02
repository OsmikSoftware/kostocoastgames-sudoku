var strike_counter = 0;
var strike_counter_div = document.getElementById("strike_counter");

function allowDrop(ev,value) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev,value) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var item = document.getElementById(data);
    var cln = item.cloneNode(true);
    if(value == cln.innerHTML){
    	ev.target.className = 'sudoku_square square_correct';
    }
    else{
    	strike_counter ++;
    	strike_counter_div.innerHTML = strike_counter;
    	ev.target.className = 'sudoku_square square_incorrect';
    }
    ev.target.innerHTML = cln.innerHTML;
}
function getRandomInclusiveNumberBetween(first_number,second_number){
	return Math.floor((Math.random() * second_number) + first_number);
}
function newGame(){
	//Reset strikes
	strike_counter = 0;
	
	//Set the HTML value of the strikes
	strike_counter_div.innerHTML = strike_counter;
	
	/***Initialize game objects***/
	//Objectify the game table
	var game_table = document.getElementById("sudoku_game");
	
	//Clear it of data
	game_table.innerHTML = '';
	
	//Array to hold all game rows
	var game_rows = [];
	
	//Array of first row
	var initial_row = [];
	
	/***Generate the 1st row***/
	//Loop until first row has 9 numbers in it
	while(initial_row.length !== 9){
		//Pick random number between 1 and 9
	    var number = getRandomInclusiveNumberBetween(1,9);
	    
	    //If the generated number isn't in our list
	    if(initial_row.indexOf(number)<0){
	    	//Add it to the list
	    	initial_row.push(number);
	    }
	}

	//Set the index of the current row
	var row_index = 0;
	
	//Set the index of the section(3 sections total)
	var section_index = 0;
	
	//Set index of where we start our loop from the initial row
	var start_index_of_initial_row = 0;
	
	//Loop until our game has 9 full rows
	while(game_rows.length !== 9){
		//Prepare the current row
		var current_row = [];
		
		//If first row in the section
		if(row_index===0){
			//Set start index to the section
			start_index_of_initial_row = section_index;
		}
		else{
			//If not the first row in the section, skip the index 3 places
			start_index_of_initial_row +=3;
		}
		
		//If at the last row in a section
		if(row_index>0 && row_index%3==0){
			//Increment section indexer
			section_index++;
			
			//Reset the row indexer
			row_index = 0;
			
			//Reset the start index
			start_index_of_initial_row = section_index;
		}
		
		//loop to end of row
		for(var i=start_index_of_initial_row;i<initial_row.length;i++){
			current_row.push(initial_row[i]);
		}
		
		//wrap around
		if(current_row.length !== 9){
			for(var n=0;n<initial_row.length;n++){
				current_row.push(initial_row[n]);
				if(current_row.length === 9){
					break;
				}
			}
		}
		game_rows.push(current_row);
		row_index++;
	}
	
	var showIndexes = [];
	while(showIndexes.length<=27){
		var index_to_show = getRandomInclusiveNumberBetween(0,80);
		if(showIndexes.indexOf(index_to_show)<0){
			showIndexes.push(index_to_show);
		}
	}
	var square_counter = 0;
	for(var i=0;i<game_rows.length;i++){
		var tr = document.createElement('tr');
		for(var n=0;n<game_rows[i].length;n++){
			square_counter++;
			var square_td = document.createElement('td');
			if(showIndexes.indexOf(square_counter)>=0){
				square_td.innerHTML = game_rows[i][n];
			}
			square_td.className = 'sudoku_square';
			square_td.setAttribute('ondrop','drop(event,"'+game_rows[i][n]+'")');
			square_td.setAttribute('ondragover','allowDrop(event,"'+game_rows[i][n]+'")');
			tr.appendChild(square_td);
		}
		game_table.appendChild(tr);
	}
}