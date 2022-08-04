/**
 * Section 5.3.8.2. Detailed information about a radio transmitter. This PDU requires manually written code to complete. The encodingScheme field can be used in multiple ways, which requires hand-written code to finish. UNFINISHED
 *
 * Copyright (c) 2008-2015, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */

import Pdu from "./Pdu";
import EntityID from "./EntityID";
import Chunk from "../disSupporting/Chunk";
// Need to convert and import EntityID() and Chunk()

// Because of how JavaScript ES6 handles imports, a clientside namespace does not need to be created in the module

// Support for node.js style modules. Ignored if used in a client context.
// See http://howtonode.org/creating-custom-modules
// if (typeof exports === "undefined")
// exports = {};


class SignalPdu extends Pdu {
  /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
  protocolVersion = 6;

  /** Exercise ID */
  exerciseID = 0;

  /** Type of pdu, unique for each PDU class */
  pduType = 26;

  /** value that refers to the protocol family, eg SimulationManagement, et */
  protocolFamily = 4;

  /** Timestamp value */
  timestamp = 0;

  /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
  pduLength = 0;

  /** zero-filled array of padding */
  padding = 0;

  /** ID of the entity that is the source of the communication, ie contains the radio */
  entityId = new EntityID(); 

  /** particular radio within an entity */
  radioId = 0;

  /** encoding scheme used, and enumeration */
  encodingScheme = 0;

  /** tdl type */
  tdlType = 0;

  /** sample rate */
  sampleRate = 0;

  /** length of data, in bits */
  dataLength = 0;

  /** number of samples. If the PDU contains encoded audio, this should be zero. */
  samples = 0;

  /** list of eight bit values. Must be padded to fall on a 32 bit boundary. */
  data = new Array();

  initFromBinary(inputStream)
  {
    this.protocolVersion = inputStream.readUByte();
    this.exerciseID = inputStream.readUByte();
    this.pduType = inputStream.readUByte();
    this.protocolFamily = inputStream.readUByte();
    this.timestamp = inputStream.readUInt();
    this.pduLength = inputStream.readUShort();
    this.padding = inputStream.readShort();
    this.entityId.initFromBinary(inputStream);
    this.radioId = inputStream.readUShort();
    this.encodingScheme = inputStream.readUShort();
    this.tdlType = inputStream.readUShort();
    this.sampleRate = inputStream.readUInt();
    this.dataLength = inputStream.readUShort();
    this.samples = inputStream.readUShort();
    try {
      for(var idx = 0; idx < (this.dataLength / 8); idx++)
      {
        var anX = new Chunk(1);
        anX.initFromBinaryDIS(inputStream); // Originally .initFromBinary, but did not exist in Chunk
        this.data.push(anX);
      }
    } catch(e) {
      console.log('error: ' + e.message);
    }
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
    this.entityId.encodeToBinary(outputStream);
    outputStream.writeUShort(this.radioId);
    outputStream.writeUShort(this.encodingScheme);
    outputStream.writeUShort(this.tdlType);
    outputStream.writeUInt(this.sampleRate);
    outputStream.writeUShort(this.dataLength);
    outputStream.writeUShort(this.samples);
    for(var idx = 0; idx < this.samples; idx++)
    {
      this.data[idx].encodeToBinary(outputStream);
    }

  };
}; // end of class

// node.js module support
// exports.SignalPdu = dis.SignalPdu;

export default SignalPdu;
// End of SignalPdu class

