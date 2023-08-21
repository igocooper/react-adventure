import { createAudio } from './decorators';

import battleTheme2 from './music/battleTheme2.aac';

import click from './sounds/click.aac';
import hover from './sounds/hover.aac';
import swordHit from './sounds/swordHit.m4a';
import axeHitFlash from './sounds/axeHitFlesh.aac';
import axeHitFullPlate from './sounds/axeHitFullPlate.aac';
import stickHitFlesh from './sounds/stickHitFullPlate.aac';
import stickHitFullPlate from './sounds/stickHitFlesh.aac';

import maleDie from './sounds/maleDie.m4a';
import femaleGrunt from './sounds/femaleGrunt.aac';
import femaleDie from './sounds/femaleDie.aac';
import miss from './sounds/miss.m4a';
import run from './sounds/run.aac';
import waterSpell from './sounds/waterSpell.aac';
import kraken from './sounds/kraken.m4a';
import bowShoot from './sounds/bowShoot.m4a';
import shield from './sounds/shield.aac';
import poison from './sounds/poison.aac';
import bleed from './sounds/bleed.aac';
import anchor from './sounds/anchor.aac';
import lightAura from './sounds/lightAura.aac';
import heal from './sounds/heal.aac';
import continuesHeal from './sounds/continuesHeal.aac';
import healed from './sounds/healed.m4a';
import skipTurn from './sounds/skipTurn.aac';

import rage from './sounds/rage.aac';
import fireBall from './sounds/fireBall.aac';
import lavaGeyser from './sounds/lavaGeyser.m4a';
import iceSpikes from './sounds/iceSpikes.m4a';

export default {
  click: createAudio(click, { volume: 0.2 }),
  hover: createAudio(hover, { volume: 0.05 }),
  swordHit: createAudio(swordHit),
  axeHitFlash: createAudio(axeHitFlash),
  axeHitFullPlate: createAudio(axeHitFullPlate),
  stickHitFullPlate: createAudio(stickHitFullPlate),
  stickHitFlesh: createAudio(stickHitFlesh),
  bowShoot: createAudio(bowShoot),
  maleDie: createAudio(maleDie, { volume: 0.2 }),
  femaleDie: createAudio(femaleDie, { volume: 0.2 }),
  femaleGrunt: createAudio(femaleGrunt, { volume: 0.2 }),
  miss: createAudio(miss, { volume: 0.5 }),
  run: createAudio(run, { volume: 0.2 }),
  shield: createAudio(shield, { volume: 0.2 }),
  poison: createAudio(poison, { volume: 0.4 }),
  bleed: createAudio(bleed, { volume: 0.4 }),
  buff: createAudio(lightAura, { volume: 0.2 }),
  anchor: createAudio(anchor, { volume: 0.4 }),
  skipTurn: createAudio(skipTurn, { volume: 0.3 }),
  waterSpell: createAudio(waterSpell),
  heal: createAudio(heal, { volume: 0.4 }),
  healed: createAudio(healed),
  continuesHeal: createAudio(continuesHeal, { volume: 0.6 }),
  rage: createAudio(rage, { volume: 0.4 }),
  iceSpikes: createAudio(iceSpikes),
  lavaGeyser: createAudio(lavaGeyser),
  fireBall: createAudio(fireBall, { volume: 0.4 }),
  kraken: createAudio(kraken),
  battleTheme2: createAudio(battleTheme2, { volume: 0.1, loop: true })
};
