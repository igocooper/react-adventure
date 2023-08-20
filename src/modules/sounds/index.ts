import swordHit from './swordHit.m4a';
import axeHit from './axeHit.m4a';
import shoot from './shot.mp3';
import hit from './Hit.wav';
import humanDie from './humanDie.m4a';
import miss from './miss.m4a';
import fireBall from './fireBall.m4a';

export default {
  swordHit: new Audio(swordHit),
  axeHit: new Audio(axeHit),
  humanDie: new Audio(humanDie),
  miss: new Audio(miss),
  shoot: new Audio(shoot),
  hit: new Audio(hit),
  fireBall: new Audio(fireBall),
};
