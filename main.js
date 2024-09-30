// Create a cursor element dynamically
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Move the cursor with the mouse
document.addEventListener('mousemove', (e) => {
  // Update cursor position using clientX and clientY to ensure it stays relative to the viewport
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
