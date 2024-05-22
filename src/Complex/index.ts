"use strict";

type ComplexNumber = [number, number];
export class Complex {
  private _z: ComplexNumber[][] | null = [[]];
  constructor(z: ComplexNumber | ComplexNumber[][]) {
    this.z = z;
  }
  set(z: ComplexNumber | ComplexNumber[][]) {
    //
  }
}
