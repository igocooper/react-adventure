export function mat3x3Identity(m: Float32Array): Float32Array {
  m[1] = m[2] = m[3] = m[5] = m[6] = m[7] = 0.0;
  m[0] = m[4] = m[8] = 1.0;
  return m;
}

export function mat3x3Scale(
  m: Float32Array,
  x: number,
  y: number
): Float32Array {
  m[0] *= x;
  m[1] *= x;
  m[2] *= x;
  m[3] *= y;
  m[4] *= y;
  m[5] *= y;
  return m;
}

export function mat3x3Transform(
  m: Float32Array,
  v: Float32Array,
  out: Float32Array
): Float32Array {
  const x: number = m[0]! * v[0]! + m[3]! * v[1]! + m[6]!;
  const y: number = m[1]! * v[0]! + m[4]! * v[1]! + m[7]!;
  const w: number = m[2]! * v[0]! + m[5]! * v[1]! + m[8]!;
  const iw: number = w ? 1 / w : 1;
  out[0] = x * iw;
  out[1] = y * iw;
  return out;
}
