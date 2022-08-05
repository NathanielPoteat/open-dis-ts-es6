/**
 * Radio modulation
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


export class ModulationType
{
   /** spread spectrum, 16 bit boolean array */
   spreadSpectrum:number = 0;

   /** major */
   major:number = 0;

   /** detail */
   detail:number = 0;

   /** system */
   system:number = 0;

  initFromBinary(inputStream)
  {
       this.spreadSpectrum = inputStream.readUShort();
       this.major = inputStream.readUShort();
       this.detail = inputStream.readUShort();
       this.system = inputStream.readUShort();
  };

  encodeToBinary(outputStream)
  {
       outputStream.writeUShort(this.spreadSpectrum);
       outputStream.writeUShort(this.major);
       outputStream.writeUShort(this.detail);
       outputStream.writeUShort(this.system);
  };
}; // end of class

 // node.js module support
//exports.ModulationType = dis.ModulationType;

// End of ModulationType class

