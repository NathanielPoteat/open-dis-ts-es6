/**
 * Section 5.3.34. Three double precision floating point values, x, y, and z
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


class Vector3Double
{
   /** X value */
   x:number = 0;

   /** Y value */
   y:number = 0;

   /** Z value */
   z:number = 0;

  initFromBinary(inputStream)
  {
       this.x = inputStream.readFloat64();
       this.y = inputStream.readFloat64();
       this.z = inputStream.readFloat64();
  };

  encodeToBinary(outputStream)
  {
       outputStream.writeFloat64(this.x);
       outputStream.writeFloat64(this.y);
       outputStream.writeFloat64(this.z);
  };
}; // end of class

 // node.js module support
//exports.Vector3Double = dis.Vector3Double;

export default Vector3Double;
// End of Vector3Double class

