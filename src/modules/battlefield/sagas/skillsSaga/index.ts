import { put, call, select, takeLatest } from 'typed-redux-saga/macro';
import type { Trooper } from 'modules/battlefield/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { activeTrooperSelector } from '../../selectors';
import type { Skill } from 'common/types';
import { TARGET } from 'common/constants';
import {
  finishTrooperTurn as finishTrooperTurnAction,
  setActiveSkill as setActiveSkillAction,
  setSkillCoolDown as setSkillCoolDownAction,
  addUsedSkills as addUsedSkillsAction
} from '../../actions';

type ApplySkillProps = {
  skill: Skill;
  targetTrooper: Trooper;
};
export function* applySkill({ skill, targetTrooper }: ApplySkillProps) {
  const activeTrooper = yield* select(activeTrooperSelector);

  if (!activeTrooper) {
    return;
  }

  yield* call(skill.applySkill, {
    targetTrooper
  });

  yield* put(
    setSkillCoolDownAction({
      id: activeTrooper.id,
      team: activeTrooper.team,
      name: skill.name,
      value: skill.coolDown
    })
  );

  // skill encoded in string with format id-skillName
  yield* put(addUsedSkillsAction(`${activeTrooper.id}-${skill.name}`));
}

function* handleSkillClick({ payload: skill }: PayloadAction<Nullable<Skill>>) {
  const activeTrooper = yield* select(activeTrooperSelector);

  if (!activeTrooper) {
    return;
  }

  if (skill?.target === TARGET.SELF) {
    yield* call(applySkill, {
      skill,
      targetTrooper: activeTrooper
    });

    yield* put(finishTrooperTurnAction());
  }
}

export function* skillsSagaWatcher() {
  yield* takeLatest(setActiveSkillAction, handleSkillClick);
}
