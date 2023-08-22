import type { Position } from 'common/types';
import type { Weapon, Armor, Helmet, Shield } from 'common/types';

type Item = Weapon | Armor | Helmet | Shield;

type NPC = {
  position: Position;
  static: boolean;
  type: string;
  id: number;
};

type GenericObject = {
  position: Position;
  type: string;
};

type Entrance = GenericObject & {};

type Container = GenericObject & {
  items: Item[];
};

type ObjectI = Entrance | Container;

type Location = {
  objects: ObjectI[];
  character: NPC[];
};
