var numberRow = 24;
var numberColumn = 24;
var currentPositionRow = 0;
var currentPositionColumn = 0;
var speed = 200;
var footprint = [];
var direction = "";

for (i = 0; i < numberRow ; i++) {
  var cellsRow = $("<div>");
  cellsRow.attr("data-row", i);
  cellsRow.attr("class", "cellsRow numberRow"+i);
  $("#frame").append(cellsRow);

  for (n = 0; n < numberColumn; n++) {
    var cellsColumn = $("<div>");
    cellsColumn.attr("data-column", n);
    cellsColumn.attr("class", "cell numberColumn"+n+" "+i+"-"+n);
    $(".numberRow"+i).append(cellsColumn);
  }
}

$(document).ready(function() {
  if (numberRow == numberColumn) {
    $(".cell").css("width", 600/numberColumn);
    $(".cell").css("height", 600/numberRow);
  }
  currentPositionRow = Math.floor(Math.random()*numberRow);
  currentPositionColumn = Math.floor(Math.random()*(numberColumn/2));
  $("."+ currentPositionRow +"-"+currentPositionColumn).addClass("snake");
  $("."+ Math.floor(Math.random()*numberRow) +"-"+ Math.floor(Math.random()*numberColumn)).addClass("food");
  footprint.push(currentPositionRow +"-"+currentPositionColumn);

  $(document).keydown(function(event) { 
    var key = (event.keyCode ? event.keyCode : event.which); 
    if (key == "38" && direction != "down" || key == "87" && direction != "down") {
      direction = "up";
    }
    else if (key == "40" && direction != "up" || key == "83" && direction != "up") {
      direction = "down";
    }
    else if (key == "39" && direction != "left" || key == "68" && direction != "left") {
      direction = "right";
    }
    else if (key == "37" && direction != "right" || key == "65"  && direction != "right") {
        direction = "left";
    }
    else if (key == "13") {
      direction = "right";
      start();
    }
    else if (key == "27") {
      gameOver();
    }
  });

  $(".startbtn").on("click", function() {
    $(".start").attr("hidden","");
    $("#frame").css("opacity","100%")
    direction = "right";
    start();
  });


  
  var timerInterval;
  function start() {
    timerInterval = setInterval(function() {
      if (direction == "up") {
        currentPositionRow--;
        var footPrintValue = currentPositionRow +"-"+currentPositionColumn;
        footprint.push(footPrintValue);
        snakeRunner();
      } else if (direction == "down") {
        currentPositionRow++;
        var footPrintValue = currentPositionRow +"-"+currentPositionColumn;
        footprint.push(footPrintValue);
        snakeRunner();
      } else if (direction == "right") {
        currentPositionColumn++;
        var footPrintValue = currentPositionRow +"-"+currentPositionColumn;
        footprint.push(footPrintValue);
        snakeRunner();
      } else if (direction == "left") {
        currentPositionColumn--;
        var footPrintValue = currentPositionRow +"-"+currentPositionColumn;
        footprint.push(footPrintValue);
        snakeRunner();
      }
    }, speed);
  }
  

  function snakeRunner() {
    var snakeHead = $("."+footprint[footprint.length-1])
    if (snakeHead.hasClass("snake") || currentPositionRow < 0 || currentPositionRow >= numberRow  || currentPositionColumn < 0 || currentPositionColumn >= numberColumn) {
      gameOver();
    } else {
      snakeHead.addClass("snake");
      if (!snakeHead.hasClass("food")) {
        $("."+footprint[0]).removeClass("snake");
        footprint.shift();
      } else {
        snakeHead.removeClass("food")
        $("."+ Math.floor(Math.random()*numberRow) +"-"+ Math.floor(Math.random()*numberColumn)).addClass("food");
      }
    }
  }

  function gameOver() {
    clearInterval(timerInterval);
    $(".gameOver").removeAttr("hidden");
    $("#frame").css("opacity","30%")
  }

  $(".tryagainbtn").on("click", function() {
    window.location.href ="index.html";
  });
});

