let dp = new DetectPosition();
/**
 * this components allow to make a door open and close when user is nearly
 * for this propouse we compare the door position with the camera's position
 * to open the door the user must be near or make click
 *
 * For the animation, it start with the 2 event but the target change for make it
 * on the right direction or prevent it starts
 * */

AFRAME.registerComponent("change-door-animation", {
	schema: {
		open: {default: false},
		axis: {default: "x"},
		dir: {default: 1}
	},
	init: function() {
		let el = this.el;
		let data = this.data;
		data.position = el.object3D.position;
		data.animation = {};
		data.dimension = {};
		data.dimension.width = el.getAttribute("width") || 1;
		data.dimension.height = el.getAttribute("height") || 1;
		data.animation.close = `${data.position.x} ${data.position.y} ${data.position.z}`;
		data.animation.open = data.axis === 'x' ? `${data.position.x - data.dir*data.dimension.width} ${data.position.y} ${data.position.z}` 
					: data.axis === 'y' ? `${data.position.x} ${data.position.y - data.dir*data.dimension.heigth} ${data.position.z}` 
					: `${data.position.x } ${data.position.y} ${data.position.z - data.dir*data.dimension.width}`;

		let changeState = function(){
			if (data.open) el.components.animation.data.to = data.animation.close
			else el.components.animation.data.to = data.animation.open;
			data.open = !data.open;
		}

		el.on("click", changeState);
		el.on("mouseenter", function() {
			data.position = el.object3D.position;
			let cameraPos = document.getElementById("camera1").object3D.position;
			let extrem = {
				"z": [data.position.z + data.dimension.width/2, data.position.z - data.dimension.width/2],
				"x": [data.position.x + 4, data.position.x - 4]
			};
			if(isOnSite(extrem, cameraPos)) {
				changeState()
			} else {
				if (!data.open) el.components.animation.data.to = data.animation.close;
				else el.components.animation.data.to = data.animation.open;
			}
		});


	}
});

/**
 * this component allow to get basic controls into a-video (play, pause only)
 */
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
		

/**
 * this components represent the change of the world
 * this means, allow to change to another projects
 */
AFRAME.registerComponent("a-world", {
	schema: {
		url: {default: "#"}
	}, init: function() {
		let el = this.el;
		let data = this.data;
		data.dimension = {};
		let r = new THREE.Box3().setFromObject(el.object3D).getSize();
		data.dimension.width = r.x
		data.dimension.height = r.y
		data.dimension.deepth = r.z
		el.on("click", function() {
			window.location = data.url
		});

		el.on("mouseenter", function() {
			data.position = el.object3D.position;
			let cameraPos = document.getElementById("camera1").object3D.position;
			let extrem = {
				"z": [data.position.z + 4, data.position.z - 4],
				"x": [data.position.x + 4, data.position.x - 4]
			};
			if(isOnSite(extrem, cameraPos)) window.location = data.url
		});
		dp.append(el, ()=>window.location = data.url);
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

