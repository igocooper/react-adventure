import type { Trooper } from './types';
import type { TroopsState } from './reducers/troopsSlice';
import { createAction } from '@reduxjs/toolkit';
export {
  setInitiative,
  setRound,
  setActivePlayer
} from './reducers/roundSlice';
export {
  setTroopers,
  applyDamage,
  applyHeal,
  setTrooperCurrentTargetId,
  setEffectDuration,
  removeEffect,
  removeAllEffects,
  addEffect,
  modifyTrooper,
  setEffectDone
} from './reducers/troopsSlice';
export { setHoveredElement } from './reducers/hoveredElementSlice';
export { setCursor } from './reducers/cursorSlice';
export {
  setBattlefieldStatus,
  toggleBattlefieldStatus
} from './reducers/battlefieldDisabledStatusSlice';

export {
  setBattlefieldLoadedStatus,
  setTrooperLoadedStatus,
  resetBattlefieldLoadedStatus,
  setTroopersToLoad
} from './reducers/battlefieldLoadedStatusSlice';

export {
  addDamageEvent,
  resetDamageEvents
} from './reducers/damageEventsSlice';

export const performAITurn = createAction('perform_AI_turn');

export const finishTrooperTurn = createAction('finish_trooper_turn');

export const startTrooperTurn = createAction('start_trooper_turn');

export const attackStarted =
  createAction<Pick<Trooper, 'id' | 'team'>>('attack_started');

export const attackFinished =
  createAction<Pick<Trooper, 'id' | 'team'>>('attack_finished');

export const supportStarted =
  createAction<Pick<Trooper, 'id' | 'team'>>('support_started');

export const supportFinished =
  createAction<Pick<Trooper, 'id' | 'team'>>('support_finished');

export const finishRound = createAction<number>('finish_round');

export const startRound = createAction<number>('start_round');

export const trooperClicked =
  createAction<Pick<Trooper, 'id' | 'team'>>('trooper_clicked');

export const waitClicked =
  createAction<Pick<Trooper, 'id' | 'team'>>('wait_clicked');

export const blockClicked =
  createAction<Pick<Trooper, 'id' | 'team'>>('block_clicked');

export const openCharacterInfo = createAction<Pick<Trooper, 'id' | 'team'>>(
  'open_character_info'
);

export const startBattle = createAction<TroopsState>('start_battle');
