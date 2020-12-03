
AFRAME.registerComponent('change-color-on-hover', {
    schema: {
	color: {default: 'red'},
	open: {default: false}

    },

    init: function () {
      var data = this.data;
      var el = this.el;  
      var defaultColor = el.getAttribute('material').color;

      el.on('mouseenter', function () {
        el.setAttribute('color', data.color);
      });

      el.on('mouseleave', function () {
        el.setAttribute('color', defaultColor);
      });
    el.on("click", function() {
	    if (data.open) el.rotateDeg(0,0,0);
	    else el.rotateDeg(0,-90,0);
	    data.open = !data.open;
    });
    }
  });

window.onload = function() {
	const scene = document.querySelector("a-scene");
	window.door = scene.querySelector(".door");


}
