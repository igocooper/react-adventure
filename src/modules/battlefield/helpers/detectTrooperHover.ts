import { HOVERED_ELEMENT_TYPE } from '../constants';
import { ATTACK_TYPE, TARGET } from 'common/constants';
import type { Element } from '../reducers/hoveredElementSlice';
import type { Trooper, Team } from 'modules/battlefield/types';
import type { Skill } from 'common/types';

export const detectTrooperHover = ({
  id,
  team,
  activeTeamName,
  activeTrooper,
  hoveredElement,
  activeSkill
}: {
  id: Trooper['id'];
  team: Trooper['team'];
  activeTeamName: Team;
  activeTrooper?: Trooper;
  hoveredElement: Element;
  activeSkill?: Nullable<Skill>;
}) => {
  if (id === hoveredElement?.id) {
    return true;
  }

  const isEnemy = team !== activeTeamName;
  const isEnemyHovered = hoveredElement?.team !== activeTeamName;
  const isAlly = !isEnemy;
  const isAllyHovered = !isEnemyHovered;

  if (
    isEnemy &&
    isEnemyHovered &&
    hoveredElement?.type === HOVERED_ELEMENT_TYPE.CHARACTER &&
    (activeTrooper?.attackType === ATTACK_TYPE.SPLASH ||
      activeSkill?.target === TARGET.ALL_ENEMIES)
  ) {
    return true;
  }

  if (
    isAlly &&
    isAllyHovered &&
    hoveredElement?.type === HOVERED_ELEMENT_TYPE.CHARACTER &&
    activeSkill?.target === TARGET.ALL_ALLIES
  ) {
    return true;
  }

  return false;
};
