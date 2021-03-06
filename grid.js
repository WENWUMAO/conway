	/*initial table; 1: live cell; 0: dead cell*/	
	/*	
	var grid = [
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,1,0,0,0],
		[0,0,0,1,1,0,0,0],
		[0,0,0,0,0,0,0,0],
		]
	*/
/*	var grid = [
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		]
*/		
		var grid = [
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,1,1,1,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		]
	/*	
	var grid = [
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,1,0,0,0],
		[0,0,0,1,1,0,0,0],
		[0,0,0,1,1,0,0,0],
		[0,0,0,1,1,0,0,0],
		[0,0,0,0,0,0,0,0],
		]
	*/
	var loop;
	

	/*when loading the page, create and show an initial table illustrating the cells*/
	function creatTable(){
		var table = document.createElement('table');
		table.setAttribute('id','Maintable');
		for(var indexRow =0; indexRow<grid.length; indexRow++){
			var row = table.insertRow(indexRow);
			var line = grid[indexRow];
			for(var indexLine=0; indexLine<line.length;indexLine++){
				var cell = row.insertCell(indexLine);
				cell.innerHTML = (line[indexLine]==1)?'*':'�';
			}			
		}
		var div = document.getElementById('canvas');
		div.appendChild(table);
	}
	
	/*calculate next generation and refresh table*/	
	function calculGrid(){
		//var newGrid = grid.slice();    //do a copy at first
		var newGrid = [];
		for( var indexRow =0; indexRow<grid.length; indexRow++){
		    var line = grid[indexRow];
			newGrid[indexRow] = line.slice();
			for(var indexLine=0; indexLine<line.length;indexLine++){
				var liveNeighbor = 0;				
				if(indexRow-1>0){  //neighbors of previous row
						if(indexLine-1>=0){
							liveNeighbor += grid[indexRow-1][indexLine-1];
						}
						if(indexLine+1<line.length){
							liveNeighbor += grid[indexRow-1][indexLine+1];
						}
						liveNeighbor += grid[indexRow-1][indexLine];	
				}
				if(indexRow+1<grid.length){   //neighbors of next row 
						if(indexLine-1>=0){
							liveNeighbor += grid[indexRow+1][indexLine-1];
						}
						if(indexLine+1<line.length){
							liveNeighbor += grid[indexRow+1][indexLine+1];
						}
						liveNeighbor += grid[indexRow+1][indexLine];	
				}
				if(true){ //neighbors of current row 
						if(indexLine-1>=0){
							liveNeighbor += grid[indexRow][indexLine-1];
						}
						if(indexLine+1<line.length){
							liveNeighbor += grid[indexRow][indexLine+1];
						}
				}	
				if(line[indexLine] == 1){        //live cell
					if(liveNeighbor>3 || liveNeighbor <2)
						newGrid[indexRow][indexLine] = 0;
				}
				if(line[indexLine] == 0){      //dead cell
					if(liveNeighbor == 3){
						newGrid[indexRow][indexLine] = 1;
					}				
				}
			}
		}		
		refreshTable(newGrid);        //refresh html table
		grid = newGrid.slice();	      //update grid data
		
	}
	
	/*refresh html content*/
	function refreshTable(newGrid){
		var table = document.getElementById('Maintable');                 //get the table and update its content
		for(var indexRow =0; indexRow<newGrid.length; indexRow++){
			var row = table.rows[indexRow];
			var line = newGrid[indexRow];
			for(var indexLine=0; indexLine<line.length;indexLine++){			    
				var cell = row.cells[indexLine];
				cell.innerHTML = (newGrid[indexRow][indexLine]==1)?'*':'�';
			}			
		}
	}
	
	/*control the looping*/
	function control(){
		var action = document.getElementById("action");
		if(action.innerHTML == "Commencer"){
			action.innerHTML = "Pause";
			loop = setInterval(function(){calculGrid()}, 1000);		//create a loop	here to calculate next generation regularly
		}else if(action.innerHTML == "Pause"){
			action.innerHTML = "Commencer";
			clearInterval(loop);                                   //cancel the loop
		}		
	}
	

