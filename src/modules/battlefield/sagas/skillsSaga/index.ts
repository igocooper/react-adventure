import { put, call, select, takeLatest } from 'typed-redux-saga/macro';
import type { Trooper } from 'modules/battlefield/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { activeTrooperSelector } from '../../selectors';
import type { Skill } from 'common/types';
import { TARGET } from 'common/constants';
import {
  finishTrooperTurn as finishTrooperTurnAction,
  setActiveSkill as setActiveSkillAction
} from '../../actions';

type ApplySkillProps = {
  skill: Skill;
  targetTrooper: Trooper;
};
export function* applySkill({ skill, targetTrooper }: ApplySkillProps) {
  yield* call(skill.applySkill, {
    targetTrooper
  });
}

function* handleSkillClick({ payload: skill }: PayloadAction<Nullable<Skill>>) {
  const activeTrooper = yield* select(activeTrooperSelector);

  if (!activeTrooper) {
    return;
  }

  if (skill?.target === TARGET.SELF) {
    yield* call(skill.applySkill, {
      targetTrooper: activeTrooper
    });

    yield* put(setActiveSkillAction(null));
    yield* put(finishTrooperTurnAction());
  }
}

export function* skillsSagaWatcher() {
  yield* takeLatest(setActiveSkillAction, handleSkillClick);
}
