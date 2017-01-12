(function(){
	var config = function(){
		var x=1;
		function getX(){
			return x;
		}
		function setX(){
			return x;
		}
		return {
			getX: getX;
			setX: setX;
		}
	}

}()
);

 $("document").ready(function() {
    // The DOM is ready!
    // The rest of the code goes here
    $("#getMessage").click(function(){
    	$("#message").text("Hi Zain...");
    });
 });
