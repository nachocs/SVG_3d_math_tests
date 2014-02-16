// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

$(function (){
    $('#svgintro').svg();
    var svg = $('#svgintro').svg('get');

    function drawIntro (svg, funcion) {
        var g = svg.group({stroke: 'black', strokeWidth: 2});
        var gmain = svg.group({stroke: 'red', strokeWidth: 5});

       	var escala = 20;
       	var centralx = 600;
       	var centraly = 400;

    /*		    	z1 = funcion(-1/escala, 0);
    		    	x1 = convertira2D(-1, 0, z1).x;
    		    	y1 = convertira2D(-1, 0, z1).y;
    */
      //  svg.line(g, x2+centralx, y2+centraly, x3+centralx, y3+centraly);

        var FUNCIONES = {
            plano: function(x, y){
            	return 0;
            },
            funcion1: function (x, y){
                return Math.sin(4*x)*Math.cos(4*y)/2;
            },
            funcion2: function(x, y){
                return Math.cos(2*x); //x*y;
            },
            funcion3: function (x, y){
                return Math.cos(3*x)+0.3*Math.sin(4*y); //x*y;
            },
            funcion4: function (x, y){
                return Math.tan(x)*Math.tan(y)+0.5*Math.sin(4*y);
            },
            funcion5: function (x, y){
                return Math.sqrt(Math.abs(x))*Math.tan(x)*Math.sin(y)-0; //x*y;
            },
            funcion6: function (x, y){
                return Math.sin(8*x*y)/2;
            }
        };
        function convertira2D(x, y, z){
            var alpha = Math.radians(30); // eje horizontal
            var beta = Math.radians(30);
        	var x1 = (x*Math.cos(alpha)*Math.cos(alpha) - y * (Math.sin(alpha) * Math.sin(alpha)))*escala*escala;
        	var y1 = -1*(0.5 * z * (Math.cos(beta)) * (Math.cos(beta)) - y * (Math.sin(beta)) * (Math.sin(beta)))*escala*escala;
        	return {
        		x: x1,
        		y: y1
        	};
        }
        function pintame(fn, color){
        	var y, x, z1, x1, y1, z2, x2, y2, xi, yi;
    	    for (yi = -1*escala; yi< escala; yi++){
    		    for (xi = -1*escala; xi< escala; xi++){
    		    	x = xi/escala;
    		    	y = yi/escala;


    		    	z1 = fn(x, y);
    		    	x1 = convertira2D(x, y, z1).x;
    		    	y1 = convertira2D(x, y, z1).y;

    		    	z2 = fn((xi+1)/escala, y);
    		    	x2 = convertira2D((xi+1)/escala, y, z2).x;
    		    	y2 = convertira2D((xi+1)/escala, y, z2).y;

    		    	z3 = fn((xi+1)/escala, (yi+1)/escala);
    		    	x3 = convertira2D((xi+1)/escala, (yi+1)/escala, z3).x;
    		    	y3 = convertira2D((xi+1)/escala, (yi+1)/escala, z3).y;

    		    	z4 = fn(x, (yi+1)/escala);
    		    	x4 = convertira2D(x, (yi+1)/escala, z4).x;
    		    	y4 = convertira2D(x, (yi+1)/escala, z4).y;
    /*			    svg.line(g, x1+centralx, y1+centraly, x2+centralx, y2+centraly);
    			    svg.line(g, x2+centralx, y2+centraly, x3+centralx, y3+centraly);
    			    svg.line(g, x3+centralx, y3+centraly, x4+centralx, y4+centraly);
    			    svg.line(g, x4+centralx, y4+centraly, x1+centralx, y1+centraly);*/
    			    svg.polygon([[x1+centralx,y1+centraly],[x2+centralx,y2+centraly],[x3+centralx,y3+centraly],[x4+centralx,y4+centraly]],{fill: 'white', stroke: color, strokeWidth: 1, opacity: 0.7});
    //			    console.log(x1, y1, x2, y2);
    		    }
    	    }

        }
        pintame(FUNCIONES.plano, 'grey');
        if (!funcion){funcion = "funcion1";}
        pintame(FUNCIONES[funcion], 'black');

    //    svg.line(gmain, convertira2D(-1, 0, funcion(-1/escala, 0)).x + centralx,  convertira2D(-1, 0, funcion(-1/escala, 0)).y + centraly,  convertira2D(1, 0, funcion(1/escala, 0)).x + centralx,  convertira2D(1, 0, funcion(1/escala, 0)).y + centraly);
        svg.line(gmain, convertira2D(-1, 0, 0).x + centralx,  convertira2D(-1, 0, 0).y + centraly,  convertira2D(1, 0, 0).x + centralx,  convertira2D(1, 0, 0).y + centraly);
        svg.line(gmain, convertira2D(0, -1, 0).x + centralx,  convertira2D(0, -1, 0).y + centraly,  convertira2D(0, 1, 0).x + centralx,  convertira2D(0, 1, 0).y + centraly);
        svg.line(gmain, convertira2D(0, 0, -1).x + centralx,  convertira2D(0, 0, -1).y + centraly,  convertira2D(0, 0, 1).x + centralx,  convertira2D(0, 0, 1).y + centraly);

    }

    $('#funcionselect').on('change', function (){
        $('#svgintro').svg('get').clear();
        var funcion = $('#funcionselect').val();
        drawIntro(svg, funcion);
    });
    drawIntro(svg, "funcion1");

});
