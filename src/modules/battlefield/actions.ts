import { createAction } from '@reduxjs/toolkit';
export {
  setInitiative,
  setRound,
  setActivePlayer
} from './reducers/roundSlice';
export { applyDamage, applyHeal } from './reducers/troopsSlice';
export { setHoveredElement } from './reducers/hoveredElementSlice';
export { setCursor } from './reducers/cursorSlice';
export {
  setBattlefieldStatus,
  toggleBattlefieldStatus
} from './reducers/battlefieldDisabledStatusSlice';
export const finishTrooperTurn = createAction('finish_trooper_turn');

export const finishRound = createAction<number>('finish_round');
export const startRound = createAction<number>('start_round');
