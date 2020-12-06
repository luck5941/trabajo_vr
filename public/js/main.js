/*
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
*/

AFRAME.registerComponent("change-door-animation", {
	schema: {
		open: {default: false}
	},
	init: function() {
		let el = this.el;
		let data = this.data;
		el.on("click", function() {
			console.log("click");
			if (data.open) door.components.animation.data.to = "5 4 -32.5"
			else door.components.animation.data.to = "5 4 -37.5"
			data.open = !data.open;
				//el.components.animation
		});
	}
});

AFRAME.registerPrimitive("a-wall", {
	defaultComponents: {
		geometry: {
			primitive: 'plane',
			height: 70,
			width:10
		},
		material: {
			shader: 'standard',
			color: 'rgb(175,180,132)',
			metalness: 0.1,
			roughness: 0.9
		},
	},
	mappings: {
		height: 'geometry.height',
		width: 'geometry.width',
	}
});

AFRAME.registerComponent("a-world", {
	schema: {
		url: {default: "#"}
	}, init: function() {
		let el = this.el;
		let data = this.data;
		el.on("click", function() {
			window.location = data.url
		});
	}
});

window.onload = function() {
	const scene = document.querySelector("a-scene");
	window.door = scene.querySelector(".door");


}
