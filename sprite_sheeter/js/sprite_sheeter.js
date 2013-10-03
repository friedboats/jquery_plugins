(function($) {

    /*
     * Author: Nick Bence
     * Date: 09/03/2013
     * Description: This plug in allows you to take an image composed of several frames that make an animation
     * sequence and animate it from left to right, moving it one frame at a time.
     * Notes: Have a contianing div for the image that is the exact width of the image's frame width and set it to overflow hidden.
     * Also, be sure that the frames in the main composed image are the exact same width.
    */

    $.fn.playFrames = function( options) {

        // Establish our default settings
        var settings = $.extend({
            maxFrames        : null,
            frameWidth       : null,
            startFrame       : 1,
            frameSpeed       : 200,
            topMarginStart   : 0,
            repeat           : 0,
            complete         : null
        }, options);

        var domElement = $(this);
        var startFrame = 0;
        var maxFrames = 0;
        var timesToRepeat = 0;
        var curRepeat = 0;
        var frameWidth = 0;
        var frameSpeed = 0;
        var topMarginStart = 0;
        var newLeftMargin = 0;
        
        //apply options
        if ( settings.maxFrames != null ) {
            maxFrames = settings.maxFrames;
        }else{
            throw "Must provide max frames.";
        }
        if ( settings.frameWidth != null ) {
            frameWidth = settings.frameWidth;
        }else{
            throw "Must provide frame width.";
        }  
        if ( settings.startFrame != null ) {
            startFrame = settings.startFrame;
            
            if(startFrame == 0){
                throw "Must provide a startFrame value greater than 0";
            }else if(startFrame > maxFrames){
                throw "Must provide a startFrame value less than maxFrames";
            }else{
                //set div to show frame specified
                newLeftMargin -= frameWidth*(startFrame-1);
                domElement.css("margin-left", newLeftMargin);
            }
        }
        if ( settings.frameSpeed != null ) {
            frameSpeed = settings.frameSpeed;
        }
        if ( settings.timesToRepeat != null ) {
            timesToRepeat = settings.timesToRepeat;
        }
        if ( settings.topMarginStart != null ) {
            topMarginStart = settings.topMarginStart;
            domElement.css("margin-top", topMarginStart);
        }
        
        //check if what's coming in has an interval id
        if(domElement.attr("data-interval-id")){
            clearInterval(domElement.attr("data-interval-id"))
        }

        //ticks through and plays each frame one by one
        var interval = setInterval(function(){
            if(startFrame < maxFrames){
                moveFrame(domElement);
                startFrame++;
            }else{
                if(timesToRepeat > 0 && curRepeat < timesToRepeat-1){
                    //reset values for next tick
                    curRepeat++;
                    startFrame = 0;
                    newLeftMargin = frameWidth;
                    //run next frame so we don't skip a beat
                    moveFrame(domElement);
                    startFrame++;
                }else{
                    clearInterval(interval);
                    if ( $.isFunction( settings.complete ) ) {
                        settings.complete.call( this );
                    }
                } 
            }
                
        }, frameSpeed);

        //set the interval id for next time in case we want to kill this animation
        domElement.attr("data-interval-id", interval);

        return domElement;



        /*return this.each( function() {
            var interval = setInterval(function(){
                if(startFrame < maxFrames){
                    moveFrame(domElement);
                    startFrame++;
                }else{
                    if(timesToRepeat > 0 && curRepeat < timesToRepeat-1){
                        //reset values for next tick
                        curRepeat++;
                        startFrame = 0;
                        newLeftMargin = frameWidth;
                        //run next frame so we don't skip a beat
                        moveFrame(domElement);
                        startFrame++;
                    }else{
                        clearInterval(interval);
                        if ( $.isFunction( settings.complete ) ) {
                            settings.complete.call( this );
                        }
                    } 
                }
                    
            }, frameSpeed);

            domElement.
        });
*/
        //moves the image containing all your frames to the left
        function moveFrame(element){
            newLeftMargin -= frameWidth;
            element.css("margin-left", newLeftMargin);
        }
    }

}(jQuery));