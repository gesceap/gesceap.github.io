var fsize = 1;
var growth = 1;
var factor = 3;
var K = 23;
var I = 230;
var initI = 60;
var initK = 5;
var initIK = 2;
var g_size_lim = I/factor;
var g_x_lim = initI/factor;
var canvas = document.getElementById('drawingCanvas');
var context = canvas.getContext('2d');
var STROKESTYLE = '#FFFFFF';
context.canvas.height = window.innerHeight;
context.canvas.width = window.innerWidth;
context.translate(canvas.width/2, canvas.height/2);

window.requestAnimFrame = (function(callback) 
{
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) 
	{
		window.setTimeout(callback, 1000 / 60);
	};
})();

function drawOctogon(x,y,size)
{
    var half = size / 2;
    context.beginPath();
    context.moveTo(x-half, y+size);
    context.lineTo(x+half, y+size);
    context.lineTo(x+size, y+half);
    context.lineTo(x+size, y-half);
    context.lineTo(x+half, y-size);
    context.lineTo(x-half, y-size);
    context.lineTo(x-size, y-half);
    context.lineTo(x-size, y+half);
    context.lineTo(x-half, y+size);
    context.strokeStyle = STROKESTYLE;
    context.stroke();
}
function animate(k, i, canvas, context) 
{
	if (i < g_size_lim) 
	{
		++i;
	}
	if (i >= g_size_lim)
	{
		i = 1;
		++k;		
	}
	if (k >= 23)
	{
		return;
	}
        context.rotate(k*Math.PI/180+i);
        drawOctogon(initK+k,initI+i*k,initIK+i-k);
	requestAnimFrame( function() { animate(k, i, canvas, context); } );

while(true){
	
    STROKESTYLE = '#FFFFFF';
    animate(0, 13, canvas, context);
	STROKESTYLE = '#000000';
    animate(0, 13, canvas, context);}
	
	
