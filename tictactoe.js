$( document ).ready(function() {

// =========== Variables ===========
	var player; 
	gameOn = true;
	teamSelection = false;
	xs =[];
	os =[];
	pickedOptions =[];
	winningArray =[["11","12","13"],["21","22","23"],["31","32","33"],["11","21","31"],["12","22","32"],["13","23","33"],["11","22","33"],["13","22","31"]];
	combinations = winningArray.length;

// =========== Team function (always on) ===========	

	function startOption() {
		$('.choice').click(function(){
			teamSelection = true;
			option = $(this).attr('value');
			if (option === "1") {
				player = "x";
				$("#xSquared").addClass("choice-selected");
				$("#oSquared").removeClass("choice-selected");

			} else {
				player = "o";
				$("#oSquared").addClass("choice-selected");
				$("#xSquared").removeClass("choice-selected");

			}
		});
	}

	startOption();

// =========== Function-Push selected squares to X/O's arrays ===========	

	$('.square').click(function() {
		if (teamSelection){   // make sure a team has been selected
			if (gameOn){        // make sure game is still on 
				squareValue = $(this).attr('value');
				$("#comments").html("");
				
				if (checkAvailability(squareValue)){  // same as checkAvailability(squareValue) === true;
					if (player == "x"){
						xs.push(squareValue);
						$(this).html("<span id='tictactoe'>X</span>");
						winningCheck(xs);
						player = "o";
					} else {
						os.push(squareValue);
						$(this).html("<span id='tictactoe'>O</span>");
						winningCheck(os);
						player = "x";
					}
				}
			}	else {
				if (confirm("You won. Would you like to start a new game?")){
					clearAll();	
				} 
			}
		} else {
			alert("Please select a team");
		}	
	});

// =========== Checks if a selected square has already been chosen? (Y/N) ===========

	function checkAvailability(squareValue){
		
		if (pickedOptions.length === 0){
			pickedOptions.push(squareValue);
			return(true);
		} else {
			tempAvailability = $.inArray(squareValue,pickedOptions);

			if (tempAvailability >= 0) {
				$("#comments").html("this square was already selected. Please pick a new one");
				return(false);
			} else { 
				pickedOptions.push(squareValue);
				return(true);
			}
		}	
	}

// ======= Winning function-takes in a playerArray ======
// ======= and compares it to the established winning combinations ======

	function winningCheck(playerArray) {

		length = playerArray.length;
		temp = playerArray;

		if (length > 2) {              //check for at least three different moves by the same player 
			for (i = 0; i < combinations; i++){
				count = 0;
				for (j = 0; j < 3; j++){
					test =$.inArray(winningArray[i][j],temp);  //looks for single element inside player array 
					if (test >= 0){
						count++;
						if (count === 3){
							if (confirm("You won. Would you like to start a new game?")){
								clearAll();	
							} 
							else {
								gameOn = false;
							}
						}
					}
				}
			}
		} else {
			playerArray = [];
		}
	}	

// =========== Restart/Clear function ===========

	$('#reset').click(function() {
		clearAll();
	});	

	function clearAll(){
		xs =[];
		os =[];
		pickedOptions =[];
		gameOn = true;
		teamSelection = false;
		$('.square').html("");
		$("#xSquared").removeClass("choice-selected");
		$("#oSquared").removeClass("choice-selected");
	}			

});
