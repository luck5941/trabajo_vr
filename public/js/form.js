function activeInput(e) {

	let parent = e.currentTarget.parentElement;
	parent.classList.add("active")
}

function disableInput(e) {
	if (e.currentTarget.value) return;
	let parent = e.currentTarget.parentElement;
	parent.classList.remove("active")
}
window.onload = function() {
	let inputs = document.querySelectorAll(".input")
	for (let input of inputs) {
		if (input.value) input.parentElement.classList.add("active");
		input.on("focus", activeInput);
		input.on("blur", disableInput);
	}
}
