"use strict";
let sleep = (t) => new Promise(resolve => setTimeout(resolve, t));

HTMLElement.prototype.on = function(tipe, callback) {
	this.addEventListener(tipe, callback);
    return this;
}

HTMLElement.prototype.rotateDeg = function(x, y, z) {
	x *= Math.PI/180;
	y *= y ? Math.PI/180 : 0;
	z *= z ? Math.PI/180 : 0;
	this.rotate(x, y, z);
    return this;
}
HTMLElement.prototype.rotate = function(x, y, z) {
	this.object3D.rotation.x = x;
	this.object3D.rotation.y = y;
	this.object3D.rotation.z = z;
    return this;
}


function isOnSite(extrem, cp) {
	let inSite = true;
	for (let cord in extrem)
		if (!((cp[cord] > extrem[cord][0] && cp[cord] < extrem[cord][1]) || 
			(cp[cord] < extrem[cord][0] && cp[cord] > extrem[cord][1])))
			inSite = false;
	return inSite;
}


class DetectPosition {
	constructor() {
		this._objects = [];
		this._max = 2000;
		this._min = 500;
		this._distance = 4;
		this._radius = 20;
        this.camera = "camera1"
	}
	get max() {
		return this._max;
	}
	set max(mx) {
		if (mx > this._min)
		this._max = mx;
	}

	get min() {
		return this._min;
	}

	set min(mn) {
		if (mn > 0 && mn < mx) this._min = mn;
	}

    get camera() {
        return this
    }
    set camera(camera_id) {
        this.camera = camera_id;
    }
	append(element, callback) {
		if (!element.object3D) throw "Error: the element must be a 3D object";
		if (typeof callback !== "function") throw "Error: the callback must be a function";
		this._objects.push([element, callback]);
		this._analyze(this._objects.length-1);
	}

	_analyze = async function(i) {
		let ox = this._objects[i][0].object3D.position.x;
		let oz = this._objects[i][0].object3D.position.z;
		let cx = document.getElementById(this._camera).object3D.position.x;
		let cz = document.getElementById(this._camera).object3D.position.z;
		//Use the manhatthan distance instead of euclidean distance for simplicy the operations
		let md = Math.abs(ox-cx) + Math.abs(oz- cz);
		if (md > this._radius) 
			await sleep(this._max);
		 else {
			if (md <= this._distance) {
				this._objects[i][1]();
				await sleep(this._max);
			} else {
				let t = (this._max-this._min)*md/(this._radius-this._distance);
				await sleep(t)
			}
		}
		this._analyze(i);
	}
}
