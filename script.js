
        var last = "O";
        var isTie = 0;
        var countEmpty = 9;
        var board = [];
        var boardLength = 9;
        var logboard = [];
        var logger = 0;


        function restart()
        {
            countEmpty = 9;
            for (var z = 0; z < boardLength; z++)
            {
                document.getElementById("cell" + z).innerText = "";
                document.getElementById("cell" + z).style.backgroundColor = "white";
                document.getElementById("prompt").innerText = "";
                document.getElementById("winningMsg").style.display = "none";
            }

        }
        
        function play(cellno)
        {
            console.log("record is " + localStorage.getItem("newrecord"));
            document.getElementById("prompt").innerText = "";

            if (document.getElementById("cell" + cellno).innerText == "")
            {
                if (last == "O")
                {
                    putX(cellno);
                }  
                else
                {
                    putO(cellno);
                } 
            }
            else 
            {
                document.getElementById("prompt").innerText = "Please Click on Empty Cells Only!!!";
            } 
            
            console.log(countEmpty + " empty");
            if (winCheck() == true)
            {
                console.log("it's a win");
                document.getElementById("winningMsg").style.display = "block";
                document.getElementById("restartButton").style.display = "block";
                document.getElementById("restartButton").style.marginLeft = "40%";
                document.getElementById("winningMsg").innerText = last + " Is A Winner!";
                document.getElementById("winningMsg").style.fontSize = "5rem"; 
                document.getElementById("winningMsg").style.fontFamily = "sans-serif";
                document.getElementById("winningMsg").style.color = "green";
                document.getElementById("winningMsg").style.textAlign = "center";

                if (countEmpty > localStorage.getItem("newrecord") && countEmpty < 5)
                {
                    console.log("there's a new record");
                    localStorage.setItem("newrecord", countEmpty);
                    alert("A NEW RECORD: " + countEmpty + " empty cells left");
                }

            }

            else if (countEmpty == 0)
            {
                console.log("it's a tie");
                document.getElementById("winningMsg").style.display = "block";
                document.getElementById("restartButton").style.display = "block";
                document.getElementById("winningMsg").innerText = "It's A Tie!";
                document.getElementById("winningMsg").style.fontSize = "5rem";   
                document.getElementById("winningMsg").style.fontFamily = "sans-serif";
                document.getElementById("winningMsg").style.textAlign = "center";
                document.getElementById("winningMsg").style.color = "green";
                document.getElementById("restartButton").style.marginLeft = "40%";
            }
            
        }
    
        function winCheck()
        {
            var winCombo = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
            ];

            for (var i = 0; i < winCombo.length; i++)
            {
              if    (document.getElementById("cell" + winCombo[i][0]).innerText == 
                    document.getElementById("cell" + winCombo[i][1]).innerText
                    && document.getElementById("cell" + winCombo[i][0]).innerText == 
                    document.getElementById("cell" + winCombo[i][2]).innerText
                    && document.getElementById("cell" + winCombo[i][0]).innerHTML != ""
                    )
                    {
                        return 1;
                    } 
            }
        }

       
        function putX(cellno)
        {
            document.getElementById("cell" + cellno).style.color = "white";
            document.getElementById("cell" + cellno).style.backgroundColor = "red";         
            document.getElementById("cell" + cellno).style.fontSize = "20px";
            document.getElementById("cell" + cellno).innerText = "X"; 
            last = "X";
            countEmpty--;
            board[cellno] = "X"; 
            console.log(board);
            logboard[logger] = cellno;
            logger++;     
        }

        function putO(cellno)
        {
            document.getElementById("cell" + cellno).style.color = "white";
            document.getElementById("cell" + cellno).style.backgroundColor = "blue";         
            document.getElementById("cell" + cellno).style.fontSize = "20px";
            document.getElementById("cell" + cellno).innerText = "O";
            last = "O"; 
            countEmpty--;
            board[cellno] = "O";
            console.log(board);
            logboard[logger] = cellno;
            logger++;     

        }

        function undo()
        {
            console.log("undoing");
            console.log(logboard);
            logger--;
            console.log(logboard[logger]);
            if (logger < 0)
            {
                document.getElementById("prompt").innerText = "You are at the very beginning of the game";
            }
            else
            {
                document.getElementById("cell" + logboard[logger]).innerText = "";
                document.getElementById("cell" + logboard[logger]).style.backgroundColor = "white";
                document.getElementById("winningMsg").style.display = "none";
                countEmpty++;
                logboard.pop();
                console.log(logboard);
            }             
        }

        function saveGame()
        {
            // saving to localStorage //
            console.log("saving to localStorage");
            localStorage.setItem("stored_board", JSON.stringify(board));
            // checking what's been saved //
            console.log("what board was saved?");
            console.log(localStorage.getItem("stored_board"));

        }

        function loadGame()
        {
            
           /* localStorage.setItem("stored_board", JSON.stringify(board));*/
            var retrievedData = localStorage.getItem("stored_board");
            var loaded_board = JSON.parse(retrievedData);

            console.log("loading last game");
            console.log(localStorage.getItem("stored_board"));
            console.log(loaded_board);

            for (i = 0; i < boardLength; i++)
            {
                if (loaded_board[i] == "X")
                {
                    document.getElementById("cell" + i).innerText = "X";
                    document.getElementById("cell" + i).style.color = "white";
                    document.getElementById("cell" + i).style.backgroundColor = "red";         
                    document.getElementById("cell" + i).style.fontSize = "20px";
                }
                else if (loaded_board[i] == "O")
                {
                    document.getElementById("cell" + i).innerText = "O";
                    document.getElementById("cell" + i).style.color = "white";
                    document.getElementById("cell" + i).style.backgroundColor = "blue";         
                    document.getElementById("cell" + i).style.fontSize = "20px";
                }
                
                else
                {
                    document.getElementById("cell" + i).innerText = "";
                    document.getElementById("cell" + i).style.backgroundColor = "white";
                }
            }
        }

       

       