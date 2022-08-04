//var BigInteger = require('BigInteger');

// Because of how JavaScript ES6 handles imports, a clientside namespace does not need to be created in the module
   
// Support for node.js style modules; ignore if not using node.js require
// if (typeof exports === "undefined")
//   exports = {};

// var Long = require('long');
// import * as Long from 'Long'; // What is 'long'?

class InputStream
{
    binaryData:ArrayBufferLike;

    constructor(binaryData:ArrayBufferLike) {
        this.binaryData = binaryData;
    }


    // @ts-ignore
    dataView = new DataView(this.binaryData, 0); // data, byte offset
    currentPosition = 0;                    // ptr to "current" position in array
    
    readUByte = function()
    {
        var data = this.dataView.getUint8(this.currentPosition);
        this.currentPosition = this.currentPosition + 1;
        return data;
    };
    
    readByte = function()
    {
        var data = this.dataView.getInt8(this.currentPosition);
        this.currentPosition = this.currentPosition + 1;
        return data;
    };
    
    readUShort = function()
    {
        var data = this.dataView.getUint16(this.currentPosition);
        this.currentPosition = this.currentPosition + 2;
        return data;
    };
    
    readShort = function()
    {
        var data = this.dataView.getInt16(this.currentPosition);
        this.currentPosition = this.currentPosition + 2;
        return data;
    };
    
    readUInt = function()
    {
        var data = this.dataView.getUint32(this.currentPosition);
        this.currentPosition = this.currentPosition + 4;
        return data;
    };
    
    readInt = function()
    {
        var data = this.dataView.getInt32(this.currentPosition);
        this.currentPosition = this.currentPosition + 4;
        return data;
    };
    
    /** Read a long integer. Assumes big endian format. Uses the BigInteger package. */
    readLongInt = function()
    {
        var data1 = this.dataView.getInt32(this.currentPosition);
        var data2 = this.dataView.getInt32(this.currentPosition + 4);
        
        this.currentPosition = this.currentPosition + 8;
        
    };
   
    readFloat32 = function()
    {
        var data = this.dataView.getFloat32(this.currentPosition);
        this.currentPosition = this.currentPosition + 4;
        return data;
    };
    
    readFloat64 = function()
    {
        var data = this.dataView.getFloat64(this.currentPosition);
        this.currentPosition = this.currentPosition + 8;
        return data;
    };
    
    readLong = function()
    {
	var high = this.dataView.getInt32(this.currentPosition);
	var low = this.dataView.getInt32(this.currentPosition + 4);
    // @ts-ignore It works, trust me
	var long = new Long(low, high);
	return long.toString();
    };
};

// exports.InputStream = dis.InputStream;
export default InputStream;
