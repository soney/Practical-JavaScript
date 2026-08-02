function createCircle(cx, cy, radius) {
    // Create an SVG circle element using the SVG namespace
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    
    // Set the circle's attributes
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', 'blue');
    
    // Select the SVG container
    const svgCanvas = document.querySelector('#svgCanvas');
    
    // Append the circle to the SVG container
    svgCanvas.append(circle);
    
    // Update the status text
    const statusElement = document.querySelector('#status');
    statusElement.textContent = 'Circle created!';
    
    // Return the circle element
    return circle;
}
