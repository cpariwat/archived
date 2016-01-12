$(function () { // wait for document ready
    
    function animate(){
      var controller = new ScrollMagic.Controller();

      var slides = document.querySelectorAll("main section");
      
      var updateHeight = function(){
          
          for(var i=0; i<slides.length - 1; i++){
            slides[i].style.height = null
            if(slides[i].offsetHeight <  window.innerHeight){
                slides[i].style.height = window.innerHeight+"px";
            }
          }
      }
      
      updateHeight();
      
      window.addEventListener("resize", function(event){
        updateHeight();
      });

      
      // Animate fading
      
      for(var i=0; i<slides.length; i++){
        var start = TweenLite.from(slides[i], 1, {alpha: "0", scaleX:1, scaleY:1.1});
        var end = TweenLite.to(slides[i], 1, {alpha: "1", scaleX:1, scaleY:1});
        var opaTl = new TimelineLite().add(start).add(end);

      
        new ScrollMagic.Scene({
            triggerElement: slides[i],
            triggerHook: 'onEnter',
            duration: 600
            })
            .setTween(opaTl)
            .addTo(controller);
      }           
      

      // Animate about section

      new ScrollMagic.Scene({
              triggerElement: slides[1],
              triggerHook: 'onEnter'
          })
          .setPin(slides[0])
          .addTo(controller);

      // Animate works section
      
      new ScrollMagic.Scene({
              triggerElement: slides[2],
              triggerHook: 'onEnter'
          })
          .setPin(slides[1])
          .addTo(controller);




      // Animate skills Section
      new ScrollMagic.Scene({
              triggerElement: slides[3],
              triggerHook: 'onEnter'
          })
          .removePin()
          .setPin(slides[2])
          .addTo(controller);
      
      var skillItems = document.querySelectorAll("#skills .skill-item");

      for(var index=0; index< skillItems.length; index++){
        var totalWidth = skillItems[index].querySelector(".skill-range").getAttribute("width");
        var skillPercentage = skillItems[index].dataset.skillPercentage;
        var thisItemWidth = totalWidth * (skillPercentage / 100);
        
        var tween1 = TweenLite.from(skillItems[index].querySelectorAll("svg.skill-range .percent"), 1, {width: "0"});
        var tween2 = TweenLite.to(skillItems[index].querySelectorAll("svg.skill-range .percent"), 1, {width: thisItemWidth});
  
        var skillUpTimeLine = new TimelineLite().add(tween1).add(tween2);
        
        new ScrollMagic.Scene({
          triggerElement: slides[2],
          triggerHook: 'onEnter',
          duration: 500
        })
        .setTween(skillUpTimeLine)
        .addTo(controller);

      }
      

      // Animate edu Section
      new ScrollMagic.Scene({
              triggerElement: slides[4],
              triggerHook: 'onEnter'
          })
          .setPin(slides[3])
          .addTo(controller);

      // Animate Languages Section
      new ScrollMagic.Scene({
              triggerElement: slides[5],
              triggerHook: 'onEnter'
          })
          .setPin(slides[4])
          .addTo(controller);
      
      var languangeDonuts = document.querySelectorAll(".language-ring");

      for(var i=0; i<languangeDonuts.length; i++){
        var progress = languangeDonuts[i].dataset.langPercent;

        var strokeOffset = (188 - (progress * 188 / 100));
        var zoomInStart = TweenLite.from(languangeDonuts[i],1, {scaleX:0, scaleY:0});
        var zoomInEnd = TweenLite.to(languangeDonuts[i],1, {scaleX:1, scaleY:1});
        var animateRingStartTween = TweenLite.from(languangeDonuts[i].querySelectorAll(".front-ring"), 1, {'stroke-dashoffset': "188"});
        var animateRingEndTween = TweenLite.to(languangeDonuts[i].querySelectorAll(".front-ring"), 1, {'stroke-dashoffset': strokeOffset});
        var animateRingTl = new TimelineLite().add(zoomInStart).add(zoomInEnd).add(animateRingStartTween).add(animateRingEndTween);

        new ScrollMagic.Scene({
          triggerElement: slides[4],
          triggerHook: 'onCenter',
          duration: 400
        })
        .setTween(animateRingTl)
        .addTo(controller);
      }
      
      // Animate Thanks Section
      new ScrollMagic.Scene({
              triggerElement: slides[6],
              triggerHook: 'onEnter'
          })
          .setPin(slides[5])
          .addTo(controller);

    }

  
    // init
  
    var allInjection = document.querySelectorAll('img.injectable');
  
    SVGInjector(allInjection,
                {},
                function() { animate(); });  
  
});