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

		let changeState = function(){
			if (data.open) el.components.animation.data.to = "15 4 -32.5"
			else el.components.animation.data.to = "15 4 -37.5"
			data.open = !data.open;
		}

		el.on("click", changeState);
		el.on("mouseenter", function() {
			let {x, y, z} = document.getElementById("camera1").object3D.position;
			data.position = el.object3D.position;
			let extrem = [data.position.z + data.dimension.width/2, data.position.z - data.dimension.width/2];
			if ((z > extrem[0] && z < extrem[1]) || (z < extrem[0] && z > extrem[1])) {
				if (data.open) el.components.animation.data.to = "15 4 -32.5"
				else el.components.animation.data.to = "15 4 -37.5"
				data.open = !data.open;
			} else 
				if (data.open) el.components.animation.data.to = "15 4 -37.5"
				else el.components.animation.data.to = "15 4 -32.5"
		});

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
			color: '#968a8a',
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

		el.on("mouseenter", function() {
			// TODO
		});
	}
});

