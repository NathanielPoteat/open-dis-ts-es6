
// Support for node.js style modules; ignore if not using node.js require
//if (typeof exports === "undefined")
//   exports = {};

//var Long = require('long');
// import * as Long from 'Long';

/**
 * @param binaryDataBuffer ArrayBuffer
*/
export class OutputStream
{
    binaryData;
    dataView;
    currentPosition;

    constructor(binaryDataBuffer) {
        this.binaryData = binaryDataBuffer;
        this.dataView = new DataView(this.binaryData); // data, byte offset
        this.currentPosition = 0;                    // ptr to current position in array
    }

    
    
    /**
     * Returns a byte array trimmed to the maximum number of bytes written
     * to the stream. Eg, if we initialize with a 500 byte bufer, and we
     * only write 10 bytes to the output stream, this will return the first
     * ten bytes of the array.
     * 
     * @returns {ArrayBuffer} Only the data written
     */
    toByteArray()
    {
        var trimmedData = this.binaryData.slice(0, this.currentPosition); 
        return trimmedData;
    };
    
    
   writeUByte(userData)
    {   
        this.dataView.setUint8(this.currentPosition, userData);
        this.currentPosition = this.currentPosition + 1;
    };
    
    writeByte(userData)
    {
        this.dataView.setInt8(this.currentPosition, userData);
        this.currentPosition = this.currentPosition + 1;
    };
    
    writeUShort(userData)
    {
        this.dataView.setUint16(this.currentPosition, userData);
        this.currentPosition = this.currentPosition + 2;
    };
    
    writeShort(userData)
    {
        this.dataView.setInt16(this.currentPosition, userData);
        this.currentPosition = this.currentPosition + 2;
    };
    
    writeUInt(userData)
    {
        this.dataView.setUint32(this.currentPosition, userData);
        this.currentPosition = this.currentPosition + 4;
    };
    
    writeInt(userData)
    {
        this.dataView.setInt32(this.currentPosition, userData);
        this.currentPosition = this.currentPosition + 4;
    };
   
    writeFloat32(userData)
    {
        this.dataView.setFloat32(this.currentPosition, userData);
        this.currentPosition = this.currentPosition + 4;
    };
    
    writeFloat64(userData)
    {
        this.dataView.setFloat64(this.currentPosition, userData);
        this.currentPosition = this.currentPosition + 8;
    };
    
    writeLong = function(userData)
    {
        // @ts-ignore Long
        var long = Long.fromString(userData);
        this.dataView.setInt32(this.currentPosition, long.getHighBits());
        this.dataView.setInt32(this.currentPosition + 4, long.getLowBits());
        this.currentPosition = this.currentPosition + 8;
    };
};

// exports.OutputStream = dis.OutputStream;
