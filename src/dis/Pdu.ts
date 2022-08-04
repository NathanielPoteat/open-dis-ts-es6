/**
 * The superclass for all PDUs. This incorporates the PduHeader record, section 5.2.29.
 *
 * Copyright (c) 2008-2015, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */

// Because of how JavaScript ES6 handles imports, a clientside namespace does not need to be created in the module

// Support for node.js style modules. Ignored if used in a client context.
// See http://howtonode.org/creating-custom-modules
// if (typeof exports === "undefined")
//  exports = {};


class Pdu {
  /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
  protocolVersion:number = 6;

  /** Exercise ID */
  exerciseID:number = 0;

  /** Type of pdu, unique for each PDU class */
  pduType:number = 0;

  /** value that refers to the protocol family, eg SimulationManagement, et */
  protocolFamily:number = 0;

  /** Timestamp value */
  timestamp:number = 0;

  /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
  pduLength:number = 0;

  /** zero-filled array of padding */
  padding:number = 0;

  initFromBinary(inputStream)
  {
    this.protocolVersion = inputStream.readUByte();
    this.exerciseID = inputStream.readUByte();
    this.pduType = inputStream.readUByte();
    this.protocolFamily = inputStream.readUByte();
    this.timestamp = inputStream.readUInt();
    this.pduLength = inputStream.readUShort();
    this.padding = inputStream.readShort();
  };

  encodeToBinary(outputStream)
  {
    outputStream.writeUByte(this.protocolVersion);
    outputStream.writeUByte(this.exerciseID);
    outputStream.writeUByte(this.pduType);
    outputStream.writeUByte(this.protocolFamily);
    outputStream.writeUInt(this.timestamp);
    outputStream.writeUShort(this.pduLength);
    outputStream.writeShort(this.padding);
  };
}; // end of class

// node.js module support
//exports.Pdu = Pdu;

// ES6 Module support
export default Pdu;
// End of Pdu class

