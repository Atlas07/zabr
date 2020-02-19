const getElement = (id: string) => document.getElementById(id);

const metricMap = {
  Cm: 'Максимальное значение приземой концентрации вредного вещеста',
  xm: 'Расстояние от источника выброса',
  um: 'Значение опасной скорости',
  Cmu: 'Максимальное значение приземной концентрации вредного вещеста, при неблагоприятных метеорологических условиях и скорости ветра u',
  Xmu: 'Расстояние от источника выброса, на котором при скоросте ветра u и неблагоприятных метеорологических условиях приземная концентрация вредных веществ достигает максимального значения',
  C: 'Приземная концентрация вредных веществ',
  Cmx: 'Максимальная концентрация',
  Umx: 'Скорость ветра',
};

interface Data {
  [string: string]: number;
}

const getValues = (e: MouseEvent): Data => {
  e.preventDefault();

  const A: HTMLInputElement = getElement('A');
  const M: HTMLInputElement = getElement('M');
  const F: HTMLInputElement = getElement('F');
  const u: HTMLInputElement = getElement('u');
  const x: HTMLInputElement = getElement('x');
  const H: HTMLInputElement = getElement('H');
  const Tg: HTMLInputElement = getElement('Tg');
  const D: HTMLInputElement = getElement('D');
  const V1: HTMLInputElement = getElement('V1');
  const nj: HTMLInputElement = getElement('nj');
  const Ta: HTMLInputElement = getElement('Ta');
  const y: HTMLInputElement = getElement('y');

  return {
    A: +A.value,
    M: +M.value,
    F: +F.value,
    u: +u.value,
    x: +x.value,
    H: +H.value,
    Tg: +Tg.value,
    D: +D.value,
    V1: +V1.value,
    nj: +nj.value,
    Ta: +Ta.value,
    y: +y.value,
  };
};

const calculate = (data: Data) => {
  let m = 0; // double.Parse(textBox4.Text);
  let n = 0; // double.Parse(textBox5.Text);

  const detT = data.Tg - data.Ta;
  const W0 = (4 * data.V1) / (Math.PI * Math.pow(data.D, 2));
  const i = data.V1 * detT;
  const kor = Math.pow(i, 1 / 3);
  const f = 1000 * (((Math.pow(W0, 2) * data.D) / Math.pow(data.H, 2)) * detT);
  const ii = (data.V1 * detT) / data.H;
  const kor2 = Math.pow(ii, 1 / 3);
  const vm = 0.65 * kor2;
  const vm2 = 1.3 * ((W0 * data.D) / data.H);
  const fe = 800 * Math.pow(vm2, 3);

  /* eslint-disable */
  if (f < 100) {
    m = 1 / (0.67 + 0.1 * Math.pow(f, 1 / 2) + 0.34 * Math.pow(f, 1 / 3));
    if (vm >= 2) {
      n = 1;
    } else {
      if (0.5 <= vm && vm < 2) {
        n = 0.532 * Math.pow(vm, 2) - 2.13 * vm + 3.13;
      } else {
        if (vm < 0.5) {
          n = 4.4 * vm;
        }
      }
    }
  } else {
    if (f >= 100 || (detT < 5 && detT >= 0)) {
      m = 1.47 / Math.pow(f, 1 / 3);
      n = m;
    }
  }
  let Cm = 0;
  Cm = (data.A * data.M * data.F * m * n * data.nj) / (data.H ** 2 * kor);
  if (f >= 100 && vm2 >= 0.5) {
    if (vm2 >= 2) {
      n = 1;
    } else {
      if (0.5 <= vm2 && vm2 < 2) {
        n = 0.532 * Math.pow(vm2, 2) - 2.13 * vm2 + 3.13;
      } else {
        if (vm2 < 0.5) {
          n = 4.4 * vm2;
        }
      }
    }
    Cm =
      ((data.A * data.M * data.F * n * data.nj) / Math.pow(data.H, 4 / 3)) *
      ((data.D / 8) * data.V1);
  }

  if ((f < 100 && vm < 0.5) || (f >= 100 && vm2 < 0.5)) {
    let m2 = 0;
    if (f < 100 && vm < 0.5) {
      m2 = 2.86 * m;
    } else {
      if (f >= 100 && vm2 < 0.5) {
        m2 = 0.9;
      }
    }
    Cm = (data.A * data.M * data.F * m2 * data.nj) / Math.pow(data.H, 7 / 3);
  }

  let xm = 0;
  let d = 0;
  if (vm <= 0.5) {
    d = 2.48 * (1 + 0.28 * Math.pow(fe, 1 / 3));
  } else {
    if (0.5 < vm && vm <= 2) {
      d = 4.95 * vm * (1 + 0.28 * Math.pow(f, 1 / 3));
    } else {
      if (vm > 2) {
        d = 7 * Math.pow(vm, 1 / 2) * (1 + 0.28 * Math.pow(f, 1 / 3));
      }
    }
  }
  if (f > 100) {
    if (vm2 <= 0.5) {
      d = 5.7;
    } else {
      if (0.5 < vm2 && vm2 <= 2) {
        d = 11.4 * vm2;
      } else {
        if (vm2 > 2) {
          d = 16 * vm2;
        }
      }
    }
  }
  xm = ((5 - data.F) / 4) * d * data.H;

  let um = 0; //небезпечна швидкість вітру
  if (f < 100) {
    if (vm <= 0.5) {
      um = 0.5;
    } else {
      if (0.5 < vm && vm <= 2) {
        um = vm;
      } else {
        if (vm > 2) {
          um = vm * (1 + 0.12 * Math.pow(f, 1 / 2));
        }
      }
    }
  } else {
    if (f > 100) {
      if (vm2 <= 0.5) {
        um = 0.5;
      } else {
        if (0.5 < vm2 && vm2 <= 2) {
          um = vm2;
        } else {
          if (vm2 > 2) {
            um = vm2 * 2.2;
          }
        }
      }
    }
  }

  let Cmu = 0;
  let U = data.u / um;
  let r = 0;
  if (U <= 1) {
    r = 0.67 * U + 1.67 * Math.pow(U, 2) - 1.34 * Math.pow(U, 3);
  } else {
    if (U > 1) {
      r = (3 * U) / (2 * Math.pow(U, 2) - U + 2);
    }
  }
  Cmu = r * Cm;

  let Xmu = 0;
  let p = 0;
  if (U <= 0.25) {
    p = 3;
  } else {
    if (0.25 < U && U <= 1) {
      p = 8.43 * Math.pow(1 - U, 3) + 1;
    } else {
      if (U > 1) {
        p = 0.32 * U + 0.68;
      }
    }
  }
  Xmu = p * xm;

  let C = 0;
  let s1 = 0;
  let X = data.x / xm;
  if (X <= 1) {
    s1 = 3 * Math.pow(X, 4) - 8 * Math.pow(X, 3) + 6 * Math.pow(X, 2);
  } else {
    if (1 <= X && X <= 8) {
      s1 = 1.13 / (0.13 * Math.pow(X, 2) + 1);
    } else {
      if (data.F <= 1.5 && X > 8) {
        s1 = X / (3.58 * Math.pow(X, 2) - 2.47 * X + 120);
      } else {
        if (data.F > 1.5 && X > 8) {
          s1 = 1 / (0.1 * Math.pow(U, 2) + 2.47 * X - 17.8);
        }
      }
    }
  }
  C = s1 * Cm;

  let ty = 0;
  let s2 = 0;
  if (data.u <= 5) {
    ty = (data.u * Math.pow(data.y, 2)) / Math.pow(data.x, 2);
  } else {
    if (data.u > 5) {
      ty = (5 * Math.pow(data.y, 2)) / Math.pow(data.x, 2);
    }
  }
  s2 =
    1 /
    Math.pow(
      1 + 5 * ty + 12.8 * Math.pow(ty, 2) + 17 * Math.pow(ty, 3) + 45.1 * Math.pow(ty, 4),
      2,
    );
  let y3 = s2 * C;

  let Cmx = 0;
  let s11 = 0;
  if (X <= 1) {
    s11 = 3 * Math.pow(X, 4) - 8 * Math.pow(X, 3) + 6 * Math.pow(X, 2);
  } else {
    if (1 < X && X <= 8) {
      s11 = 1.1 / (0.1 * Math.pow(X, 2) + 1);
    } else {
      if (8 < X && X <= 24) {
        s11 = 2.55 / (0.13 * Math.pow(X, 2) + 1);
      } else {
        if (24 < X && X < 80 && data.F <= 1.5) {
          s11 = X / (4.75 * Math.pow(X, 2) - 140 * X + 1435);
        } else {
          if (24 < X && X < 80 && data.F > 1.5) {
            s11 = 2.26 / (0.1 * Math.pow(X, 2) + 7.41 * X - 160);
          } else {
            if (X > 80 && data.F <= 1.5) {
              s11 = X / (3.58 * Math.pow(X, 2) - 35.2 * X + 120);
            } else {
              if (X > 80 && data.F > 1.5) {
                s11 = 1 / (0.1 * Math.pow(X, 2) + 2.47 * X - 178);
              }
            }
          }
        }
      }
    }
  }
  Cmx = s11 * Cm;

  let Umx = 0;
  let f1 = 0;
  if (X <= 1) {
    f1 = 1;
  } else {
    if (1 < X && X <= 8) {
      f1 = (0.75 + 0.25 * X) / 1 + Math.pow(data.x / (9 * xm), 3);
    } else {
      if (8 < X && X < 80) {
        f1 = 0.25;
      } else {
        if (X >= 80) {
          f1 = 1;
        }
      }
    }
  }
  Umx = f1 * um;

  let newM = 0; //потужність викиду
  if (f >= 100) {
    newM =
      ((Cm * Math.pow(data.H, 4 / 3)) / data.A) * data.F * n * data.nj * ((8 * data.V1) / data.D);
  } else {
    newM = ((Cm * Math.pow(data.H, 2)) / (data.A * data.F * m * n * data.nj)) * kor;
  }

  const newH = Math.pow((data.A * newM * data.F * data.nj) / (Cm * kor), 1 / 2);
  /* eslint-enable */

  console.log({
    Cm,
    xm,
    um,
    Cmu,
    Xmu,
    C,
    Cmx,
    Umx,
  });

  return {
    Cm,
    xm,
    um,
    Cmu,
    Xmu,
    C,
    Cmx,
    Umx,
  };
};

const showResult = (key: string, value: number) => {
  const element = getElement(key);

  element.innerHTML = `${key}: ${value} \n ${metricMap[key]}`;
};

window.onload = () => {
  const submit = <HTMLInputElement>document.getElementById('submit');

  submit.onclick = (e: MouseEvent) => {
    const data: Data = getValues(e);
    const results = calculate(data);

    Object
      .entries(results)
      .forEach(([key, value]) => showResult(key, value));
  };
};
