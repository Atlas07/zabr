const getElement = (id: string) => document.getElementById(id);

window.onload = () => {
  const submit = getElement("submit");

  submit.onclick = (e: any) => {
    e.preventDefault();

    const m = +getElement("m").value;
    const Q = +getElement("Q").value;
    const n = +getElement("n").value;
    const C0 = +getElement("C0").value;
    const Ccer = +getElement("Ccer").value;
    const ne = +getElement("ne").value;
    const x11 = +getElement("x11").value;
    const y11 = +getElement("y11").value;
    const y21 = +getElement("y21").value;
    const x12 = +getElement("x12").value;
    const y12 = +getElement("y12").value;
    const y22 = +getElement("y22").value;

    console.log({
      m,
      Q,
      n,
      C0,
      Ccer,
      ne,
      x11,
      y11,
      y21,
      x12,
      y12,
      y22,
    });

    const q = 0.01 * m; //питома витрата природного потоку підземних вод
    let xp = -((Q / 2) * 3.14 * q); //точка застою нижче потоку

    //точки, що обмежують область живлення на осі Оу
    let y1 = (Q / 4) * q;
    let y2 = -((Q / 4) * q);

    let Psi11 = 0;
    let Psi12 = 0;

    if (x11 > 0) {
      Psi11 = (Q / 2) * 3.14 * m * Math.atan(y11 / x11) + q / m + y11;
      Psi12 = (Q / 2) * 3.14 * m * Math.atan(y21 / x11) + q / m + y21;
    } else {
      Psi11 = (Q / 2) * 3.14 * m * (3.14 - Math.atan(y11 / x11)) + q / m + y11;
      Psi12 = (Q / 2) * 3.14 * m * (3.14 - Math.atan(y21 / x11)) + q / m + y21;
    }

    let Psi21 = 0;
    let Psi22 = 0;

    if (x12 > 0) {
      Psi21 = (Q / 2) * 3.14 * m * Math.atan(y12 / x12) + q / m + y12;
      Psi22 = (Q / 2) * 3.14 * m * Math.atan(y22 / x12) + q / m + y22;
    } else {
      Psi21 = (Q / 2) * 3.14 * m * (3.14 - Math.atan(y12 / x12)) + q / m + y12;
      Psi22 = (Q / 2) * 3.14 * m * (3.14 - Math.atan(y22 / x12)) + q / m + y22;
    }

    console.log('q - питома витрата природного потоку підземних вод', q);
    console.log('xp - точка застою нижче потоку', xp);

    console.log("Psi11", Psi11);
    console.log("Psi12", Psi12);

    console.log("Psi21", Psi21);
    console.log("Psi22", Psi22);

    let Psi11Res;
    if (Math.abs(Psi11) < (Q / 2) * m) {
      // console.log("Psi11 - трохи потрапляє забруднення.");
      Psi11Res = 'Psi11 - трохи потрапляє забруднення.';
    } else {
      if (Math.abs(Psi11) == (Q / 2) * m) {
        // console.log("Psi11 - область живлення водозабору знаходиться на нейтральній течії.");
        Psi11Res = 'Psi11 - область живлення водозабору знаходиться на нейтральній течії.';
      } else {
        if (Math.abs(Psi11) == 0) {
          // console.log("Psi11 - джерело водозабору на головній течії.");
          Psi11Res = 'Psi11 - джерело водозабору на головній течії.';
        }
      }
    }
    console.log('Psi11', Psi11Res);

    let Psi12Res;
    if (Math.abs(Psi12) < (Q / 2) * m) {
      // console.log("Psi12 - трохи потрапляє забруднення.");
      Psi12Res = 'Psi12 - трохи потрапляє забруднення.';
    } else {
      if (Math.abs(Psi12) == (Q / 2) * m) {
        // console.log("Psi12 - область живлення водозабору знаходиться на нейтральній течії.");
        Psi12Res = 'Psi12 - область живлення водозабору знаходиться на нейтральній течії.';
      } else {
        if (Math.abs(Psi12) == 0) {
          // console.log("Psi12 - джерело водозабору на головній течії.");
          Psi12Res = 'Psi12 - джерело водозабору на головній течії.';
        }
      }
    }
    console.log('Psi12', Psi12Res);

    let Psi21Res;
    if (Math.abs(Psi21) < (Q / 2) * m) {
      // console.log("Psi21 - трохи потрапляє забруднення.");
      Psi21Res = 'Psi21 - трохи потрапляє забруднення.';
    } else {
      if (Math.abs(Psi21) == (Q / 2) * m) {
        // console.log("Psi21 - область живлення водозабору знаходиться на нейтральній течії.");
        Psi21Res = 'Psi21 - область живлення водозабору знаходиться на нейтральній течії.';
      } else {
        if (Math.abs(Psi21) == 0) {
          // console.log("Psi21 - джерело водозабору на головній течії.");
          Psi21Res = 'Psi21 - джерело водозабору на головній течії.';
        }
      }
    }
    console.log('Psi21', Psi21Res);

    let Psi22Res;
    if (Math.abs(Psi22) < (Q / 2) * m) {
      // console.log("Psi22 - трохи потрапляє забруднення.");
      Psi22Res = 'Psi22 - трохи потрапляє забруднення.';
    } else {
      if (Math.abs(Psi22) == (Q / 2) * m) {
        Psi22Res = 'Psi22 - область живлення водозабору знаходиться на нейтральній течії.';
        // console.log("Psi22 - область живлення водозабору знаходиться на нейтральній течії.");
      } else {
        if (Math.abs(Psi22) == 0) {
          Psi22Res = 'Psi22 - джерело водозабору на головній течії.';
          // console.log("Psi22 - джерело водозабору на головній течії.");
        }
      }
    }
    console.log('Psi22', Psi22Res);

    let Xcer1 = x11 / 2;
    let Ycer1 = y11 / 2;
    let r2 = Math.pow(Xcer1, 2) + Math.pow(Ycer1, 2);
    let Vx = -(((Q * Xcer1) / 2) * 3.14 * m * r2) + q / m; //середнє значення швидкості в середній точці
    let Vy = ((Q * Ycer1) / 2) * 3.14 * m * r2;
    let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2)); //модуль швидкості міграції в цій точці
    let Lt = Math.sqrt(Math.pow(x11, 2) + Math.pow(y11, 2));
    let tf = (Lt * n) / V; //час міграції уздовж всієї лінії течії

    let Q12 = (Psi12 - Psi11) * m; //приплив мінералізованої води

    let Cs1 = (C0 * (Q - Q12) + Ccer * Q12) / Q; //концентрація речовини у воді, що відкачує свердловина

    let xf = 0;
    let Tf = ((ne * m * n) / q) * (x11 - xf - xp * Math.log((xf - xp) / (x11 - xp)));

    let q12 = (Psi22 - Psi21) * m; //друге джерело

    let Cs2 = (C0 * (Q - q12) + Ccer * q12) / Q;

    console.log('Vx - середнє значення швидкості в середній точці', Vx);
    console.log('Vy', Vy);
    console.log('V - модуль швидкості міграції в цій точці', V);
    console.log('Tf - час міграції уздовж всієї лінії течії', Tf);
    console.log('Q1,2 - приплив мінералізованої води першого джерела', Q12);
    console.log('Cs1 - концентрація речовини у воді, що відкачує свердловина 1 джерела', Cs1);
    console.log('Q1,2 - приплив мінералізованої води другого джерела', Q12);
    console.log('Cs2 - концентрація речовини у воді, що відкачує свердловина 2 джерела', Cs2);
    console.log('----------');

    if (tf > Cs2) {
      // alert("Мінералізація у водозаборі на головній течії більша.");
      console.log('Мінералізація у водозаборі на головній течії більша.');
    } else {
      // alert("tf < Cs2");
      console.log('tf < Cs2');
    }

    const result = `

      Розрахунок: ${new Date()}
      
      q - питома витрата природного потоку підземних вод, ${q}
      xp - точка застою нижче потоку, ${xp}

      Psi11 - ${Psi11}
      Psi12 - ${Psi12}
      Psi21 - ${Psi21}
      Psi22 - ${Psi22}

      ${Psi11Res || ''}
      ${Psi12Res || ''}
      ${Psi21Res || ''}
      ${Psi22Res || ''}

      Vx - середнє значення швидкості в середній точці, ${Vx}
      Vy, ${Vy}
      V - модуль швидкості міграції в цій точці, ${V}
      Tf - час міграції уздовж всієї лінії течії, ${Tf}
      Q1,2 - приплив мінералізованої води першого джерела, ${Q12}
      Cs1 - концентрація речовини у воді, що відкачує свердловина 1 джерела, ${Cs1}
      Q1,2 - приплив мінералізованої води другого джерела, ${Q12}
      Cs2 - концентрація речовини у воді, що відкачує свердловина 2 джерела, ${Cs2}

      ${tf > Cs2 ? 'Мінералізація у водозаборі на головній течії більша.' : 'Мінералізація у водозаборі на головній течії менша.'}
    `;

    console.log(result);

    document.getElementById('result').innerHTML += result;
  };
};
