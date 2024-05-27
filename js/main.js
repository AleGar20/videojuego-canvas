// Inicialización del canvas
var canvas = document.getElementById("Tennis check");
var ctx = canvas.getContext("2d");

// Variables del juego
var level = 1;
var circles = [];
var score = 0;

// Función para crear un nuevo círculo
function createCircle() {
    var radius = Math.random() * 50 + 20; // Radio aleatorio entre 20 y 70
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16); // Color aleatorio

    circles.push({x: x, y: y, radius: radius, color: color});
}

// Función para dibujar los círculos en el canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar todos los círculos
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Función para verificar si se hizo clic en un círculo
function checkClick(x, y) {
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        var dx = x - circle.x;
        var dy = y - circle.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle.radius) {
            circles.splice(i, 1); // Eliminar el círculo clickeado
            score++; // Incrementar el puntaje
            if (circles.length === 0) {
                level++; // Pasar al siguiente nivel si no quedan círculos
                for (var j = 0; j < level; j++) {
                    createCircle(); // Crear nuevos círculos para el siguiente nivel
                }
            }
            return;
        }
    }
}

// Evento de clic en el canvas
canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    checkClick(mouseX, mouseY);
});

// Función principal del juego
function main() {
    draw();
    requestAnimationFrame(main);
}

// Inicialización del juego
for (var i = 0; i < level; i++) {
    createCircle();
}
main();

