const getElement = (id: string) => document.getElementById(id);

const P = (atmosphereValue, city) => {
  let p = 0;
  if (city) {
    if (atmosphereValue == "A") {
      p = 0.07;
    }
    if (atmosphereValue == "B") {
      p = 0.07;
    }
    if (atmosphereValue == "C") {
      p = 0.1;
    }
    if (atmosphereValue == "D") {
      p = 0.15;
    }
    if (atmosphereValue == "E") {
      p = 0.35;
    }
    if (atmosphereValue == "F") {
      p = 0.55;
    }
  } else {
    if (atmosphereValue == "A") {
      p = 0.15;
    }
    if (atmosphereValue == "B") {
      p = 0.15;
    }
    if (atmosphereValue == "C") {
      p = 0.2;
    }
    if (atmosphereValue == "D") {
      p = 0.25;
    }
    if (atmosphereValue == "E") {
      p = 0.3;
    }
    if (atmosphereValue == "F") {
      p = 0.3;
    }
  }
  console.log("P", p);
  return p;
};

const Uss = (Hs, Zref, Uref, atmosphereValue, city) => {
  const p = P(atmosphereValue, city);
  const r = Hs / Zref;
  const Us = Uref * Math.pow(r, p);

  return Us;
};

const F = (g, vs, ds, Ts, Ta) => {
  return g * vs * ds * ds * ((Ts - Ta) / (4 * Ts));
};

const koefA = (X, atmosphereValue) => {
  const A = 0;
  if (atmosphereValue == "A") {
    if (X < 100) {
      A = 122.8;
    }
    if (X >= 100 && X < 160) {
      A = 158.08;
    }
    if (X >= 160 && X < 210) {
      A = 170.22;
    }
    if (X >= 210 && X < 260) {
      A = 179.52;
    }
    if (X >= 260 && X < 310) {
      A = 217.41;
    }
    if (X >= 310 && X < 410) {
      A = 258.89;
    }
    if (X >= 410 && X < 510) {
      A = 346.75;
    }
    if (X >= 510 && X < 3110) {
      A = 453.85;
    }
    if (X >= 3110) {
      A = 0;
    }
  }

  if (atmosphereValue == "B") {
    if (X < 210) {
      A = 90.673;
    }
    if (X >= 210 && X <= 400) {
      A = 98.483;
    }
    if (X > 400) {
      A = 109.3;
    }
  }

  if (atmosphereValue == "C") {
    A = 61.141;
  }

  if (atmosphereValue == "D") {
    if (X < 310) {
      A = 34.459;
    }
    if (X >= 310 && X < 1010) {
      A = 32.093;
    }
    if (X >= 1010 && X < 3010) {
      A = 32.093;
    }
    if (X >= 3010 && X < 10010) {
      A = 33.504;
    }
    if (X >= 10010 && X < 30000) {
      A = 36.65;
    }
    if (X >= 30000) {
      A = 44.053;
    }
  }

  if (atmosphereValue == "E") {
    if (X < 100) {
      A = 24.26;
    }
    if (X >= 100 && X < 310) {
      A = 23.331;
    }
    if (X >= 310 && X < 1010) {
      A = 21.628;
    }
    if (X >= 1010 && X < 2010) {
      A = 21.628;
    }
    if (X >= 2010 && X < 4010) {
      A = 22.534;
    }
    if (X >= 4010 && X < 10010) {
      A = 24.703;
    }
    if (X >= 10010 && X < 20010) {
      A = 26.97;
    }
    if (X >= 20010 && X < 40000) {
      A = 35.42;
    }
    if (X >= 40000) {
      A = 47.618;
    }
  }

  if (atmosphereValue == "F") {
    if (X < 210) {
      A = 15.209;
    }
    if (X >= 210 && X < 710) {
      A = 14.457;
    }
    if (X >= 710 && X < 1010) {
      A = 13.953;
    }
    if (X >= 1010 && X < 2010) {
      A = 13.953;
    }
    if (X >= 2010 && X < 3010) {
      A = 14.823;
    }
    if (X >= 3010 && X < 7010) {
      A = 16.187;
    }
    if (X >= 7010 && X < 15010) {
      A = 17.836;
    }
    if (X >= 15010 && X < 30010) {
      A = 22.651;
    }
    if (X >= 30010 && X < 60000) {
      A = 27.074;
    }
    if (X >= 60000) {
      A = 34.219;
    }
  }
  console.log("A", A);
  return A;
};

const koefB = (X, atmosphereValue) => {
  let B = 0;
  if (atmosphereValue == "A") {
    if (X < 100) {
      B = 0.9447;
    }
    if (X >= 100 && X < 160) {
      B = 1.0542;
    }
    if (X >= 160 && X < 210) {
      B = 1.0932;
    }
    if (X >= 210 && X < 260) {
      B = 1.1262;
    }
    if (X >= 260 && X < 310) {
      B = 1.2644;
    }
    if (X >= 310 && X < 410) {
      B = 1.4094;
    }
    if (X >= 410 && X < 510) {
      B = 1.7283;
    }
    if (X >= 510 && X < 3110) {
      B = 2.1166;
    }
    if (X >= 3110) {
      B = 0;
    }
  }

  if (atmosphereValue == "B") {
    if (X < 210) {
      B = 0.93198;
    }
    if (X >= 210 && X <= 400) {
      B = 0.98332;
    }
    if (X > 400) {
      B = 1.0971;
    }
  }

  if (atmosphereValue == "C") {
    B = 0.91465;
  }

  if (atmosphereValue == "D") {
    if (X < 310) {
      B = 0.86974;
    }
    if (X >= 310 && X < 1010) {
      B = 0.81066;
    }
    if (X >= 1010 && X < 3010) {
      B = 0.64403;
    }
    if (X >= 3010 && X < 10010) {
      B = 0.60486;
    }
    if (X >= 10010 && X < 30000) {
      B = 0.56589;
    }
    if (X >= 30000) {
      B = 0.51179;
    }
  }

  if (atmosphereValue == "E") {
    if (X < 100) {
      B = 0.8366;
    }
    if (X >= 100 && X < 310) {
      B = 0.81956;
    }
    if (X >= 310 && X < 1010) {
      B = 0.7566;
    }
    if (X >= 1010 && X < 2010) {
      B = 0.63077;
    }
    if (X >= 2010 && X < 4010) {
      B = 0.57154;
    }
    if (X >= 4010 && X < 10010) {
      B = 0.50527;
    }
    if (X >= 10010 && X < 20010) {
      B = 0.46713;
    }
    if (X >= 20010 && X < 40000) {
      B = 0.37615;
    }
    if (X >= 40000) {
      B = 0.29592;
    }
  }

  if (atmosphereValue == "F") {
    if (X < 210) {
      B = 0.81558;
    }
    if (X >= 210 && X < 710) {
      B = 0.78407;
    }
    if (X >= 710 && X < 1010) {
      B = 0.68465;
    }
    if (X >= 1010 && X < 2010) {
      B = 0.63227;
    }
    if (X >= 2010 && X < 3010) {
      B = 0.54503;
    }
    if (X >= 3010 && X < 7010) {
      B = 0.4649;
    }
    if (X >= 7010 && X < 15010) {
      B = 0.41507;
    }
    if (X >= 15010 && X < 30010) {
      B = 0.32681;
    }
    if (X >= 30010 && X < 60000) {
      B = 0.27436;
    }
    if (X >= 60000) {
      B = 0.21716;
    }
  }
  console.log("B", B);
  return B;
};

const koefC = atmosphereValue => {
  let C = 0;

  if (atmosphereValue == "A") {
    C = 24.167;
  }
  if (atmosphereValue == "B") {
    C = 18.333;
  }
  if (atmosphereValue == "C") {
    C = 12.5;
  }
  if (atmosphereValue == "D") {
    C = 8.333;
  }
  if (atmosphereValue == "E") {
    C = 6.25;
  }
  if (atmosphereValue == "F") {
    C = 4.1667;
  }
  console.log("C", C);
  return C;
};

const koefD = atmosphereValue => {
  let D = 0;

  if (atmosphereValue == "A") {
    D = 2.5334;
  }
  if (atmosphereValue == "B") {
    D = 1.8096;
  }
  if (atmosphereValue == "C") {
    D = 1.0857;
  }
  if (atmosphereValue == "D") {
    D = 0.72382;
  }
  if (atmosphereValue == "E") {
    D = 0.54287;
  }
  if (atmosphereValue == "F") {
    D = 0.36191;
  }
  console.log("D", D);
  return D;
};

const Sy = (X, atmosphereValue) => {
  let Sy = 0;

  const C = koefC(atmosphereValue);
  const D = koefD(atmosphereValue);

  Sy = 456.11628 * X * Math.tan(0.01745329 * (C - D * Math.log(X)));

  return Sy;
};

const Sz = (X, atmosphereValue) => {
  let Sz = 0;

  const A = koefA(X, atmosphereValue);
  const B = koefB(X, atmosphereValue);

  Sz = A * Math.pow(X, B);

  return Sz;
};

window.onload = () => {
  const submit = getElement("submit");
  const result = getElement("result");

  submit.onclick = (e: any) => {
    e.preventDefault();

    const Q = +getElement("Q").value;
    const Hs = +getElement("Hs").value;
    const ds = +getElement("ds").value;
    const vs = +getElement("vs").value;
    const Ts = +getElement("Ts").value;
    const Uref = +getElement("Uref").value;
    const Zref = +getElement("Zref").value;
    const Ta = +getElement("Ta").value;
    const X = +getElement("X").value;
    const y = +getElement("y").value;
    const z = +getElement("z").value;

    const city = getElement("city").checked;
    const village = getElement("village").checked;

    const atmosphere = getElement("atmosphere");
    const atmosphereValue = atmosphere.options;

    const e = document.getElementById("atmosphere");
    const atmosphereValue = "A" || e.options[e.selectedIndex].value;
    // const atmosphereText = e.options[e.selectedIndex].text;

    console.log({
      Q,
      Hs,
      ds,
      vs,
      Ts,
      Uref,
      Zref,
      Ta,
      X,
      y,
      z,
      city,
      village,
      atmosphereValue,
    });

    let Us = Uss(Hs, Zref, Uref, atmosphereValue, city);
    let Hs_;
    const g = 9.8;

    if (vs < 1.5 * Us) {
      Hs_ = Hs - 2 * ds * (vs / Us - 1.5);
      console.log("Hs_", Hs_);
    } else {
      Hs_ = Hs;
      console.log("Hs_", Hs_);
    }

    let Xf;
    let Fb = F(g, vs, ds, Ts, Ta);

    if (Fb < 55) {
      Xf = 49 * Math.pow(Fb, 5 / 8);
      console.log("Xf", Xf);
    } else {
      Xf = 119 * Math.pow(Fb, 2 / 5);
      console.log("Xf", Xf);
    }

    let He;

    if (
      atmosphereValue == "A" ||
      atmosphereValue == "B" ||
      atmosphereValue == "C" ||
      atmosphereValue == "D"
    ) {
      if (X < Xf) {
        He = Hs_ + 1.6 * ((Math.pow(Fb, 1 / 3) * Math.pow(Xf, 1 / 3)) / Us);
      } else {
        He = Hs_ + 1.6 * ((Math.pow(Fb, 1 / 3) * Math.pow(X, 1 / 3)) / Us);
      }
      console.log("He", He);
    } else {
      let sigma = 0;
      if (atmosphereValue == "E") {
        sigma = 0.02;
      }

      if (atmosphereValue == "F") {
        sigma = 0.035;
      }

      let s = (g * sigma) / Ta;

      if (1.84 * Us * Math.pow(s, -1 / 2) >= Xf) {
        if (X < Xf) {
          He = Hs_ + 1.6 * ((Math.pow(Fb, 1 / 3) * Math.pow(Xf, 1 / 3)) / Us);
        } else {
          He = Hs_ + 1.6 * ((Math.pow(Fb, 1 / 3) * Math.pow(X, 1 / 3)) / Us);
        }
        //He = Hs_ + 1.6 * (Math.Pow(Fb, 1 / 3f) * Math.Pow(Xf, 1 / 3f) / Us);
      } else {
        He = Hs_ + 2.4 * (Fb / (Us * s));
      }
      console.log("He", He);
    }

    let V = 0;
    //double H1 = (z - (2 * m * L - He));
    let L = 320 * 10;
    let Szz = Sz(X, atmosphereValue);

    let sum = 0;
    if (
      atmosphereValue == "A" ||
      atmosphereValue == "B" ||
      atmosphereValue == "C" ||
      atmosphereValue == "D"
    ) {
      for (let m = 1; m <= 3; m++) {
        sum =
          sum +
          Math.exp((-0.5 * Math.pow(z - (2 * m * L - He), 2)) / Math.pow(Szz, 2)) +
          Math.exp((-0.5 * Math.pow(z + (2 * m * L - He), 2)) / Math.pow(Szz, 2)) +
          Math.exp((-0.5 * Math.pow(z - (2 * m * L + He), 2)) / Math.pow(Szz, 2)) +
          Math.exp((-0.5 * Math.pow(z + (2 * m * L + He), 2)) / Math.pow(Szz, 2));
      }
    }
    console.log("sum", sum);

    V =
      Math.exp((-0.5 * Math.pow(z - He, 2)) / Math.pow(Szz, 2)) +
      Math.exp((-0.5 * Math.pow(z + He, 2)) / Math.pow(Szz, 2)) +
      sum;
    console.log("V", V);

    const K = 1000000; // коэф.
    let Syy = Sy(X, atmosphereValue);

    let C =
      ((Q * K * V) / (2 * Math.PI * Us * Syy * Szz)) *
      Math.exp(-0.5 * (Math.pow(y, 2) / Math.pow(Syy, 2))); //
    console.log("C", C * 10000);
    result.value = C * 10000;
  };
};
