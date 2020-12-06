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
		data.position = el.object3D.position;
		data.dimension = {};
		data.dimension.width = el.getAttribute("width") || 1;
		data.dimension.height = el.getAttribute("height") || 1;
		el.on("click", function() {
			if (data.open) this.components.animation.data.to = "5 4 -32.5"
			else this.components.animation.data.to = "5 4 -37.5"
			data.open = !data.open;
		});
		/*
		el.on("mouseenter", function() {
			let camera_pos = document.getElementById("camera").object3D.position;
		});
		*/
	}
});
AFRAME.registerComponent("play-video", {
	schema: {
		video: {default: ""},
		play: {default: false}
	},
	init: function() {
		let el = this.el;
		let data = this.data;
		if (data.play && data.video) 
			document.querySelector(`#${data.video}`).play();
		el.on("click", function() {
			if (!data.video)
				throw "Error: Video was necesary";
			if (!data.play)
				document.querySelector(`#${data.video}`).play();
			else
				document.querySelector(`#${data.video}`).pause();
			data.play = !data.play;
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

