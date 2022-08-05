/**
 * Section 5.3.8.1. Detailed information about a radio transmitter. This PDU requires manually         written code to complete, since the modulation parameters are of variable length. UNFINISHED
 *
 * Copyright (c) 2008-2015, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */

import { BeamAntennaPattern } from "./BeamAntennaPattern";
import { EntityID } from "./EntityID";
import { ModulationType } from "./ModulationType";
import { Pdu } from "./Pdu";
import { RadioEntityType } from "./RadioEntityType";
import { Vector3Double } from "./Vector3Double";
import { Vector3Float } from "./Vector3Float";
// TODO: Convert and import EntityID, RadioEntityType, Vector3Double, Vector3Float, ModulationType, BeamAntennaPattern

// Because of how JavaScript ES6 handles imports, a clientside namespace does not need to be created in the module

// Support for node.js style modules. Ignored if used in a client context.
// See http://howtonode.org/creating-custom-modules
// if (typeof exports === "undefined")
// exports = {};


export class TransmitterPdu extends Pdu {
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   protocolVersion:number = 6;

   /** Exercise ID */
   exerciseID:number = 0;

   /** Type of pdu, unique for each PDU class */
   pduType:number = 25;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   protocolFamily:number = 4;

   /** Timestamp value */
   timestamp:number = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   pduLength:number = 0;

   /** zero-filled array of padding */
   padding:number = 0;

   /** ID of the entity that is the source of the communication, ie contains the radio */
   entityId:EntityID = new EntityID(); 

   /** particular radio within an entity */
   radioId:number = 0;

   /** linear accelleration of entity */
   radioEntityType:RadioEntityType = new RadioEntityType(); 

   /** transmit state */
   transmitState:number = 0;

   /** input source */
   inputSource:number = 0;

   /** padding */
   padding1:number = 0;

   /** Location of antenna */
   antennaLocation = new Vector3Double(); 

   /** relative location of antenna, in entity coordinates */
   relativeAntennaLocation = new Vector3Float(); 

   /** antenna pattern type */
   antennaPatternType:number = 0;

   /** atenna pattern length */
   antennaPatternCount:number = 0;

   /** frequency */
   frequency:number = 0;

   /** transmit frequency Bandwidth */
   transmitFrequencyBandwidth:number = 0;

   /** transmission power */
   power:number = 0;

   /** modulation */
   modulationType:ModulationType = new ModulationType(); 

   /** crypto system enumeration */
   cryptoSystem:number = 0;

   /** crypto system key identifer */
   cryptoKeyId:number = 0;

   /** how many modulation parameters we have */
   modulationParameterCount:number = 0;

   /** padding2 */
   padding2:number = 0;

   /** padding3 */
   padding3:number = 0;

   /** variable length list of modulation parameters */
    modulationParametersList = new Array();
 
   /** variable length list of antenna pattern records */
    antennaPatternList = new Array();
 
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
       this.radioEntityType.initFromBinary(inputStream);
       this.transmitState = inputStream.readUByte();
       this.inputSource = inputStream.readUByte();
       this.padding1 = inputStream.readUShort();
       this.antennaLocation.initFromBinary(inputStream);
       this.relativeAntennaLocation.initFromBinary(inputStream);
       this.antennaPatternType = inputStream.readUShort();
       this.antennaPatternCount = inputStream.readUShort();
       this.frequency = inputStream.readLong();
       this.transmitFrequencyBandwidth = inputStream.readFloat32();
       this.power = inputStream.readFloat32();
       this.modulationType.initFromBinary(inputStream);
       this.cryptoSystem = inputStream.readUShort();
       this.cryptoKeyId = inputStream.readUShort();
       this.modulationParameterCount = inputStream.readUByte();
       this.padding2 = inputStream.readUShort();
       this.padding3 = inputStream.readUByte();
       for(var idx = 0; idx < this.modulationParameterCount; idx++)
       {
           var anXa = new ModulationType();
           anXa.initFromBinary(inputStream);
           this.modulationParametersList.push(anXa);
       }

       for(var idx = 0; idx < this.antennaPatternCount; idx++)
       {
           var anXb = new BeamAntennaPattern();
           anXb.initFromBinary(inputStream);
           this.antennaPatternList.push(anXb);
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
       this.radioEntityType.encodeToBinary(outputStream);
       outputStream.writeUByte(this.transmitState);
       outputStream.writeUByte(this.inputSource);
       outputStream.writeUShort(this.padding1);
       this.antennaLocation.encodeToBinary(outputStream);
       this.relativeAntennaLocation.encodeToBinary(outputStream);
       outputStream.writeUShort(this.antennaPatternType);
       outputStream.writeUShort(this.antennaPatternCount);
       outputStream.writeLong(this.frequency);
       outputStream.writeFloat32(this.transmitFrequencyBandwidth);
       outputStream.writeFloat32(this.power);
       this.modulationType.encodeToBinary(outputStream);
       outputStream.writeUShort(this.cryptoSystem);
       outputStream.writeUShort(this.cryptoKeyId);
       outputStream.writeUByte(this.modulationParameterCount);
       outputStream.writeUShort(this.padding2);
       outputStream.writeUByte(this.padding3);
       for(var idx = 0; idx < this.modulationParametersList.length; idx++)
       {
        this.modulationParametersList[idx].encodeToBinary(outputStream);
       }

       for(var idx = 0; idx < this.antennaPatternList.length; idx++)
       {
        this.antennaPatternList[idx].encodeToBinary(outputStream);
       }

  };
}; // end of class

 // node.js module support
//exports.TransmitterPdu = dis.TransmitterPdu;

// End of TransmitterPdu class

