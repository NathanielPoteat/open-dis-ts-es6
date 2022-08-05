

// Because of how JavaScript ES6 handles imports, a clientside namespace does not need to be created in the module


// Support for node.js style modules; ignore if not using node.js require
// if (typeof exports === "undefined")
//   exports = {};

// Replaces (n)ByteChunk functions
// chunkSize: specify the size of the chunk, ie 1 = 1 byte chunk, 8 = 8 byte chunk, etc.
// usage: var foo = new Chunk(4) // for a 4 byte chunk
export class Chunk
 {
	chunkSize:number = 0;

	constructor(chunkSize:number) {
		this.chunkSize = chunkSize;
	}

	data = new Array(this.chunkSize).fill(0);
	// chunkSize = chunkSize;

	initFromBinaryDIS(inputStream) {
		for(var i = 0; i < this.chunkSize; i++) {
			this.data[i] = inputStream.readByte();
		}
	}
	encodeToBinaryDIS(outputStream) {
		for(var i = 0; i < this.chunkSize; i++) {
			outputStream.writeByte(this.data[i]);
		}
	}
}

// exports.Chunk = dis.Chunk
