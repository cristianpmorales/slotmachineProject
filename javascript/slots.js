$(document).ready(function() {

  var sources =["fruit/strawberry.png","fruit/cherry.png","fruit/blueberry.png","fruit/cookie.png","fruit/banana.png","fruit/avocado.png","fruit/tomato.png"];
  var reel = [$("#reel1"), $("#reel2"), $("#reel3")];
  var intervals = [];
  var money = 0; //Purse
  var bet = 0;

/////////function for random Image//////////
  function rotate() {
    reel.forEach(function(slot) {
      var interval = setInterval(function() {
        var source = sources[Math.floor(Math.random() * sources.length)];
        slot.attr('src', source);
      }, 150);
      intervals.push(interval);
    })
  }

  function clear(index) {
    clearInterval(intervals[index]);
    intervals[index] = "stopped";
  }

  // 1. Set AMOUNT
  $('#setButton').on('click', function() {
    money = parseFloat(Number($('#setAmount').val())).toFixed(2);
    if (results = /^[0-9.]+$/.test(money)){
      $('#purse').text('$' +money);
      $('#errorMessage').text('')
      console.log("true")
    } else{
      $('#errorMessage').text('not monies please enter monies')
      console.log("not actual monies");
    }
  });

  // 2. Bet AMOUNT && Start Rotation
  $('#betButton').on('click', function() {
    bet = parseFloat(Number($('#betAmount').val())).toFixed(2);
    if (results = /^[0-9.]+$/.test(bet)){
      $('#errorMessage').text('')
          if(+bet > +money){
              alert("Bet is greater than purse please enter a lower bet")
            }else
              rotate()
        } else{
                $('#errorMessage').text('not a numerical bet please enter a bet')
                console.log("not actual monies");
              }
        // }

    //calls function rotate to start rotation


    //setTImeout
      // if all intervals have been stopped
      // don't call adjustPurse
  });

///////////////////////STOP BUTTONS////////////////////
  $("#stop1, #stop2, #stop3").on("click", function(event) {
    var stopId = event.target.attributes["data-id"].value;

    clear(stopId);

    var areAllIntervalsStopped = intervals.every(function(interval) {
      return interval === 'stopped';
    });

    if (areAllIntervalsStopped) {
    intervals = []
    adjustPurse();
    }
  })
  function adjustPurse() {
    if ($('#reel1').attr('src') == $('#reel2').attr('src') && $('#reel2').attr('src') == $('#reel3').attr('src')){
      var newTotal = parseFloat(Number(money) + Number(bet)).toFixed(2);
      console.log(newTotal);
      money = newTotal
      alert("You Won bruh!!")
      $('#purse').text("$" + money)
    }else{
      var newTotal = parseFloat(money - bet).toFixed(2);
      //var newTotal = money - bet;
      money = newTotal;
      alert("You lost bruhh")
    }
    if (newTotal == Number(0)){
      alert("You got no more monies. Set a new amount")
    }
    $('#purse').text("$" + money)
  }

});
