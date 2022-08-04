/**
 * Section 5.2.17. Three floating point values representing an orientation, psi, theta, and phi, aka the euler angles, in radians
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


class Orientation
{
   psi:number = 0;

   theta:number = 0;

   phi:number = 0;

  initFromBinary(inputStream)
  {
       this.psi = inputStream.readFloat32();
       this.theta = inputStream.readFloat32();
       this.phi = inputStream.readFloat32();
  };

  encodeToBinary(outputStream)
  {
       outputStream.writeFloat32(this.psi);
       outputStream.writeFloat32(this.theta);
       outputStream.writeFloat32(this.phi);
  };
}; // end of class

 // node.js module support
//exports.Orientation = dis.Orientation;

export default Orientation;
// End of Orientation class

