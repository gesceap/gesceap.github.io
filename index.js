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
var rc = 0;
var rcovElement = document.getElementById('rcov');
var limit = 67 * 2;
var doneWithSquares = false;

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
	drawCount();
	requestAnimFrame(
		function(){
			animate(k, i, canvas, context);
		}
	);
}

function drawSquare(x, y) {
  j = 0;
  strokeStyles = ['#FFFFFF','#000000'];
  for (i = 0; i < limit; i++){
    j = j ? 0 : 1;
    context.beginPath();
    context.strokeStyle = strokeStyles[j];
    context.moveTo(x, y+i);
    context.lineTo(x+limit, y+i);
    context.stroke();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawSquares(x, y) {
  for (row = 0; row < 4; row++){
    for (col = 0; col < 4; col++) {
        new_x = (col * ( limit + 2 ) ) + x;
        new_y = (row * ( limit + 2 ) ) + y;
        drawSquare(new_x, new_y);
        await sleep(100);
    }
  }
	doneWithSquares = true;
}

function drawCount(){
	rcovElement.textContent = "" + rc;
}

function initContext()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.canvas.height = window.innerHeight;
	context.canvas.width = window.innerWidth;
	context.translate(
		canvas.width / 2,
		canvas.height / 2
	);
	context.canvas.addEventListener(
		'click',
		init,
		false
	);
}

function initWindow(){
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
	window.onresize = start;
}

function incrementrc(){
	rc++;
}

async function init(){
	initWindow();
	initContext();
	square_start_x = -(limit * 2);
	square_start_y = -(limit * 2);
	drawSquares(square_start_x, square_start_y);
	while (!doneWithSquares){
		await sleep(100);
	}
	start();
}

function start()
{
	doneWithSquares = false;
	incrementrc();
	animate(init_K, init_I, canvas, context);
}
