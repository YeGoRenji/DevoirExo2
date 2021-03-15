class Point {
  constructor(nom, x, y) {
    this.nom = nom;
    this.x = (x * width) / 10;
    this.y = height - (y * height) / 10;
  }
}
class Vecteur {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
let X;
let E;
let r;
let G;
let F;
let de = 10;

function distance(p1, p2) {
  return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
}

function ProdScal(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function Colineaires(p1, p2, p3) {
  let v1 = new Vecteur(p2.x - p1.x, p2.y - p1.y),
    v2 = new Vecteur(p3.x - p2.x, p3.y - p2.y);

  let ps = ProdScal(v1, v2);

  let mv1xmv2 = distance(p1, p2) * distance(p2, p3);

  // On compare le produit scalaire avec le produit des modules des deux vecteurs
  if (ps === mv1xmv2 || ps === -mv1xmv2) return true;
  else return false;
}

function tracerSchema(Z, Q, r) {
  //A B C D
  strokeWeight(10);
  for (let i = 0; i < 4; i++) {
    var a = Z.x - sqrt(2) * r * cos(PI / 4 + i * HALF_PI);
    var b = Z.y - sqrt(2) * r * sin(PI / 4 + i * HALF_PI);
    point(a, b);
  }

  for (let i = 0; i < 4; i++) {
    var a = Z.x - sqrt(2) * r * cos(PI / 4 + i * HALF_PI);
    var b = Z.y - sqrt(2) * r * sin(PI / 4 + i * HALF_PI);
    strokeWeight(2);
    line(
      a,
      b,
      Z.x - sqrt(2) * r * cos(PI / 4 + (i + 1) * HALF_PI),
      Z.y - sqrt(2) * r * sin(PI / 4 + (i + 1) * HALF_PI)
    );
  }
  strokeWeight(10);
  //G
  G.x = Z.x - r * sqrt(2);
  G.y = Z.y;
  point(G.x, G.y);
  //F
  F.x = Z.x + r * sqrt(2);
  F.y = Z.y;
  point(F.x, F.y);
  strokeWeight(2);
  line(G.x, G.y, F.x, F.y);
  line(G.x, G.y, Q.x, Q.y);
  line(F.x, F.y, Q.x, Q.y);
  noFill();

  strokeWeight(5);
  point(Z.x, Z.y);
  point(Q.x, Q.y);
  strokeWeight(2);
  circle(Z.x, Z.y, 2 * r);
  circle(Z.x, Z.y, 2 * sqrt(2) * r);
}

function move() {
  if (keyIsDown(UP_ARROW)) E.y -= de;

  if (keyIsDown(RIGHT_ARROW)) E.x += de;

  if (keyIsDown(DOWN_ARROW)) E.y += de;

  if (keyIsDown(LEFT_ARROW)) E.x -= de;
}

function mouseWheel(event) {
  r += event.delta / 50;
}

function setup() {
  createCanvas(400, 400);
  background(220);
  // for (let i = 0; i < width; i += width / 10) {
  //   line(i, 0, i, height);
  //   line(0, i, width, i);
  // }
  r = (1 * height) / 10;
  X = new Point("X", 3, 2);
  E = new Point("E", 5, 5);
  G = new Point("G", X.x - r * sqrt(2), X.y);
  F = new Point("F", X.x + r * sqrt(2), X.y);
}

function draw() {
  background(220);
  if (keyIsPressed) move();
  X.x = mouseX;
  X.y = mouseY;
  tracerSchema(X, E, r);
}
