/**
 * Section 5.2.4.2. Used when the antenna pattern type field has a value of 1. Specifies           the direction, patter, and polarization of radiation from an antenna.
 *
 * Copyright (c) 2008-2015, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */

import Orientation from "./Orientation";



// Support for node.js style modules. Ignored if used in a client context.
// See http://howtonode.org/creating-custom-modules
//if (typeof exports === "undefined")
// exports = {};


class BeamAntennaPattern
{
   /** The rotation that transformst he reference coordinate sytem     into the beam coordinate system. Either world coordinates or entity coordinates may be used as the     reference coordinate system, as specified by teh reference system field of the antenna pattern record. */
   beamDirection = new Orientation(); 

   azimuthBeamwidth = 0;

   elevationBeamwidth = 0;

   referenceSystem = 0;

   padding1 = 0;

   padding2 = 0;

   /** Magnigute of the z-component in beam coordinates at some arbitrary      single point in the mainbeam      and in the far field of the antenna. */
   ez = 0;

   /** Magnigute of the x-component in beam coordinates at some arbitrary      single point in the mainbeam      and in the far field of the antenna. */
   ex = 0;

   /** THe phase angle between Ez and Ex in radians. */
   phase = 0;

  initFromBinary(inputStream)
  {
       this.beamDirection.initFromBinary(inputStream);
       this.azimuthBeamwidth = inputStream.readFloat32();
       this.elevationBeamwidth = inputStream.readFloat32();
       this.referenceSystem = inputStream.readFloat32();
       this.padding1 = inputStream.readShort();
       this.padding2 = inputStream.readByte();
       this.ez = inputStream.readFloat32();
       this.ex = inputStream.readFloat32();
       this.phase = inputStream.readFloat32();
  };

  encodeToBinary(outputStream)
  {
       this.beamDirection.encodeToBinary(outputStream);
       outputStream.writeFloat32(this.azimuthBeamwidth);
       outputStream.writeFloat32(this.elevationBeamwidth);
       outputStream.writeFloat32(this.referenceSystem);
       outputStream.writeShort(this.padding1);
       outputStream.writeByte(this.padding2);
       outputStream.writeFloat32(this.ez);
       outputStream.writeFloat32(this.ex);
       outputStream.writeFloat32(this.phase);
  };
}; // end of class

 // node.js module support
//exports.BeamAntennaPattern = dis.BeamAntennaPattern;

export default BeamAntennaPattern;
// End of BeamAntennaPattern class

