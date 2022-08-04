/**
 * Section 5.2.25. Identifies the type of radio
 *
 * Copyright (c) 2008-2015, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */

// Support for node.js style modules. Ignored if used in a client context.
// See http://howtonode.org/creating-custom-modules
//if (typeof exports === "undefined")
// exports = {};

class RadioEntityType
{
   /** Kind of entity */
   entityKind:number = 0;

   /** Domain of entity (air, surface, subsurface, space, etc) */
   domain:number = 0;

   /** country to which the design of the entity is attributed */
   country:number = 0;

   /** category of entity */
   category:number = 0;

   /** specific info based on subcategory field */
   nomenclatureVersion:number = 0;

   nomenclature:number = 0;

  initFromBinary(inputStream)
  {
       this.entityKind = inputStream.readUByte();
       this.domain = inputStream.readUByte();
       this.country = inputStream.readUShort();
       this.category = inputStream.readUByte();
       this.nomenclatureVersion = inputStream.readUByte();
       this.nomenclature = inputStream.readUShort();
  };

  encodeToBinary(outputStream)
  {
       outputStream.writeUByte(this.entityKind);
       outputStream.writeUByte(this.domain);
       outputStream.writeUShort(this.country);
       outputStream.writeUByte(this.category);
       outputStream.writeUByte(this.nomenclatureVersion);
       outputStream.writeUShort(this.nomenclature);
  };
}; // end of class

 // node.js module support
//exports.RadioEntityType = dis.RadioEntityType;

// ES6 module support
export default RadioEntityType;

// End of RadioEntityType class

