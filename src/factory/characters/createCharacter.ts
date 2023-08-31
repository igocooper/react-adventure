import { applyCharacterEquipmentStats } from 'common/helpers';
import type { Character } from 'common/types';

export const createCharacter = (props: Character): Character => {
  return applyCharacterEquipmentStats(props, props.equipment);
};
