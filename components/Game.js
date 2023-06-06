AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },    
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 120;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;
    var duration = 120

    setInterval(() => {
      if (duration >= 0){
        minutes = parseInt(duration/60)
        seconds = parseInt(duration%60)

        if (minutes<10){
          minutes = "0" + minutes
        }
        if (seconds<10){
          seconds = "0" + seconds
        }
        timerEl.setAttribute("text",{
          value : minutes + ":" + seconds
        })

duration -= 1

      }
    }, 1000);
  },



  updateTargets : function() {
    var element = document.querySelector("#target")
    var count = element.getAttribute("text").value
    var curentTargets = parseInt(count)
    curentTargets -= 1 
    element.setAttribute("text", {
      value : curentTargets
    })
  },

  updateScore : function() {
    var element = document.querySelector("#score")
    var score = element.getAttribute("text").value
    var curentScore = parseInt(score)
    curentScore += 10 
    element.setAttribute("text", {
      value : curentScore
    })
  },

  gameover : function(){
    var element = document.querySelector("#gameover")
    var element2 = document.querySelector("#plane_model")
    element.setAttribute("visible", true)
    element2.setAttribute("dynamic-body", {
      mass:10
    })
  },


  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible", false)
        this.updateTargets()
        this.updateScore()
      } else {
        this.gameover()
      }
    });
  },
  
});
