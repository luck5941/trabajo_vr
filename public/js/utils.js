"use strict";

HTMLElement.prototype.on = function(tipe, callback) {
	return this.addEventListener(tipe, callback);
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
