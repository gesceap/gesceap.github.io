var fsize = 1;
var growth = 1;
var factor = 3;
var K = 23;
var I = 230;
var j = 0;
var init_I = 13;
var init_K = 0;
var static_I = 60;
var static_K = 5;
var static_IK = 2;
var g_size_lim = I / factor;
var g_x_lim = static_I / factor;
var strokeStyles = ['#FFFFFF', '#000000'];
var canvas = document.getElementById('drawingCanvas');
var context = canvas.getContext('2d');

window.requestAnimFrame = (
	function(callback)
	{
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback)
		{
			window.setTimeout(callback, 1000 / 60);
		};
	}
)();

function drawOctogon(x, y, size, strokeStyle)
{
	var half = size / 2.0;
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
	context.strokeStyle = strokeStyle;
	context.stroke();
}
function animate(k, i, canvas, context)
{
	if (i < g_size_lim){
		++i;
	}
	if (i >= g_size_lim){
		i = 1;
		++k;
	}
	if (k >= 23){
		j = j ? 0 : 1;
		animate(init_K, init_I, canvas, context);
		return;
	}
	context.rotate(
		k*Math.PI / 180+i
	);
	drawOctogon(
		static_K+k,
		static_I+i*k,
		static_IK+i-k,
		strokeStyles[j]
	);
	requestAnimFrame(
		function(){
			animate(k, i, canvas, context);
		}
	);
}
function initContext()
{
	context.canvas.height = window.innerHeight;
	context.canvas.width = window.innerWidth;
	context.translate(
		canvas.width / 2,
		canvas.height / 2
	);
}
function main()
{
	initContext();
	animate(init_K, init_I, canvas, context);
}
main();
