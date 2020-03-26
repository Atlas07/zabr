const getElement = (id: string) => document.getElementById(id);

const Calculation_Tf = (d, q, n, Yp) => {
  const Tf = Math.abs(
    (n / q) * (((Math.pow(d, 2) - Math.pow(Yp, 2)) / Yp) * Math.atan(d / Yp) - d),
  );
  return Tf;
};

const Calculation_Cs = (Q, C0, Cr, Qr, Qgw) => {
  return Math.abs((C0 * Qgw + Cr * Qr) / Q);
};

const Calculation_Qgw = (Q, d, q, Yp) => {
  return ((2 * Q) / Math.PI) * Math.atan(d / Yp) + 2 * q * Yp;
};

const Calculation_q = (V, m) => {
  return V * m;
};

const Calculation_Xp = (Q, d, q) => {
  return Math.sqrt(Math.abs(d * (d - Q / (Math.PI * q))));
};

const Calculation_Yp = (Q, d, q) => {
  return Math.sqrt(Math.abs(d * (Q / (Math.PI * q) - d)));
};

const Calculation_Qr = (Q, d, q, Yp) => {
  return ((2 * Q) / Math.PI) * Math.atan(Yp / d) - 2 * q * Yp;
};

window.onload = () => {
  const submit = getElement("submit");

  submit.onclick = (e: any) => {
    e.preventDefault();

    const V = +getElement("V").value;
    const m = +getElement("m").value;
    const n = +getElement("n").value;
    const C0 = +getElement("C0").value;
    const Cr = +getElement("Cr").value;

    const d1 = +getElement("d1").value;
    const d2 = +getElement("d2").value;
    const Q1 = +getElement("Q1").value;
    const Q2 = +getElement("Q2").value;

    console.log({
      V,
      m,
      n,
      C0,
      Cr,
      d1,
      d2,
      Q1,
      Q2,
    });

    let Xp1 = 1,
      Yp1 = 1,
      Xp2 = 1,
      Yp2 = 1,
      Cs1 = 0,
      Tf1 = 0,
      Cs2 = 0,
      Tf2 = 0;

    let q = Calculation_q(V, m);

    let result = `
    Розрахунок: ${new Date()}
    `;

    //джерело 1
    if (Q1 / (Math.PI * q) < d1) {
      Xp1 = Calculation_Xp(Q1, d1, q);
      Tf1 =
        (n / q) *
        ((Math.pow(d1, 2) - Math.pow(Xp1, 2)) /
          (2 * Xp1)) /** Math.Log(Math.Abs(((d1 + Xp1) * (0 - Xp1)) / ((d1 - Xp1) * (0 + Xp1))))*/;
      result += `
      Припливу від ріки немає.`;
      result += `
      Tf1, час підтягування річкової води від берега 1 джерела - ${Tf1}`;
    } else {
      Yp1 = Math.sqrt(Math.abs(d1 * (Q1 / (Math.PI * q) - d1))) /*Calculation_Yp(Q1, d1, q)*/;
      let Qr1 = Calculation_Qr(Q1, d1, q, Yp1);
      let Qgw1 = Calculation_Qgw(Q1, d1, q, Yp1);
      Cs1 = Calculation_Cs(Q1, C0, Cr, Qr1, Qgw1);
      Tf1 = Calculation_Tf(d1, q, n, Yp1);
      result += `
      Cs1, середня мінералізація у водозаборі 1 джерела - ${Cs1}`;
      result += `
      Tf1, час підтягування річкової води від берега 1 джерела - ${Tf1}`;
    }

    //джерело 2
    if (Q2 / (Math.PI * q) < d2) {
      Xp2 = Calculation_Xp(Q2, d2, q);
      Tf2 = Math.abs(
        (n / q) *
          ((Math.pow(d2, 2) - Math.pow(Xp2, 2)) /
            (2 * Xp2)) /* * Math.Log(((d2 + Xp2) * (0 - Xp2)) / ((d2 - Xp2) * (0 + Xp2)))*/,
      );
      result += `
      Припливу від ріки немає.`;
      result += `
      Tf2, час підтягування річкової води від берега 1 джерела - ${Tf2}`;
    } else {
      Yp2 = Calculation_Yp(Q2, d2, q);
      let Qr2 = Calculation_Qr(Q2, d2, q, Yp2);
      let Qgw2 = Calculation_Qgw(Q2, d2, q, Yp2);
      Cs2 = Calculation_Cs(Q2, C0, Cr, Qr2, Qgw2);
      Tf2 = Calculation_Tf(d2, q, n, Yp2);
      result += `
      Cs2, середня мінералізація у водозаборі 1 джерела - ${Cs2}`;
      result += `
      Tf2, час підтягування річкової води від берега 1 джерела - ${Tf2}`;
    }

    //w.WriteLine("Cs1, середня мінералізація у водозаборі 1 джерела - {0}", Cs1);
    //w.WriteLine("Tf1, час підтягування річкової води від берега 1 джерела - {0}", Tf1);
    //w.WriteLine("Cs2, середня мінералізація у водозаборі 2 джерела - {0}", Cs2);
    //w.WriteLine("Tf2, час підтягування річкової води від берега 2 джерела - {0}", Tf2);
    if (Cs1 > Cs2) {
      result += `
      Якість води у разі водовідбору у джерела 1 гірше.`;
    } else if (Cs1 < Cs2) {
      result += `
      Якість води у разі водовідбору у джерела 2 гірше.`;
    } else
      result += `
      Якість води у разі водовідбору у джерел 1 та 2 однакова.`;

    if (Tf1 > Tf2) {
      result += `
      Час міграції річкових вод більше у джерела 1.`;
    } else if (Tf1 < Tf2) {
      result += `
      Час міграції річкових вод більше у джерела 2.`;
    } else
      result += `
      Час міграції річкових вод у джерел 1 та 2 однаковий.`;

    console.log(result);
  };
};
