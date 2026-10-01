// window.onload is shorthand for this
window.addEventListener("load", () => {
	// document.body is the selector to retrieve the body html element
	
	// function mousePressed() {
	// 	print(mouseX, mouseY);
	//  }
	document.body.addEventListener("click", (e) => {
		console.log(e);
		console.log("document.body was clicked");
		console.log(`${e.clientX}, ${e.clientY}`);
	});

	// using ids are good for js!
	// any time we have an interaction, using an id is best practice
	let textDiv = document.getElementById('text');
	// key presses need to be on the document itself
	document.addEventListener('keydown', (e) => {
		console.log('key pressed!');
		console.log(e.key);
		// adding the key that was typed to the div on my page
		textDiv.textContent += e.key;

		if (e.key == ' ') {
			textDiv.textContent += '!';
		}
	});
});

