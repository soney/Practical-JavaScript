const svgNS = "http://www.w3.org/2000/svg";

// Create the triangle polygon
const triangle = document.createElementNS(svgNS, "polygon");
triangle.setAttribute("points", "200,50 300,350 100,350");
triangle.setAttribute("fill", "orange");
triangle.setAttribute("stroke", "black");
triangle.setAttribute("stroke-width", "3");

// Add it to the SVG canvas
const canvas = document.querySelector("#svgCanvas");
canvas.append(triangle);

// Update the status message
const message = document.querySelector("#message");
message.textContent = "Triangle added to canvas!";
