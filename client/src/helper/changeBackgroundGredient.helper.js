let colors = [
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0],
    [0, 0, 0],
    [128, 128, 128],
    [255, 255, 255],
    [255, 255, 0],
    [0, 255, 255],
    [128, 0, 128],
    [0, 128, 0],
    [0, 0, 128],
    [128, 0, 0],
    [0, 128, 128],
    [128, 128, 0],
    [192, 192, 192],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [128, 0, 255],
    [255, 0, 128],
    [0, 255, 128],
    [128, 255, 0],
    [128, 0, 255],
    [0, 128, 255],
    [255, 128, 0],
    [255, 0, 128],
    [0, 255, 128]
];

let element = document.body; // Using document.body directly

let step = 0;
let Ar_Rotate = ['to right bottom', 'to left bottom', 'to left bottom', 'to right bottom'];
let rand_Rotate1 = Math.floor(Math.random() * Ar_Rotate.length);
let colorIndices = [0, 1, 2, 3];
var gradientSpeed = 0.005;

function updateGradient() {
    // Calculate the current colors
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = `rgb(${r1}, ${g1}, ${b1})`;

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = `rgb(${r2}, ${g2}, ${b2})`;

    // Apply the gradient to the body element
    element.style.background = `linear-gradient(${Ar_Rotate[rand_Rotate1]}, ${color1}, ${color2})`;

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    }
}

export {
    updateGradient
}
