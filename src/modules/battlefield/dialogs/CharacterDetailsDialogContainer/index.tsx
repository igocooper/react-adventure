import React from 'react';
import { useDialogActions } from 'common/hooks/useDialogActions';
import { Dialog } from 'common/components/Dialog';
import { useSelector } from 'store/hooks';
import { makeCharacterByIdSelector } from '../../selectors';
import { getCharacterByType } from '../../helpers/getCharacterByType';
import { Slot } from 'common/components/Dialog/styled';
import { Resistance } from 'common/components/Resistance';
import { Content, Row } from './styled';
import { Info } from './components/Info';
import { Abilities } from './components/Abilities';

export const CharacterDetailsDialogContainer = ({ id }: { id: number }) => {
  const { closeDialog } = useDialogActions();
  const character = useSelector(makeCharacterByIdSelector(id));

  if (!character) return null;

  const { type } = character;

  const CharacterComponent = getCharacterByType(type);

  return (
    <Dialog header="Character Details" onClose={closeDialog}>
      <Content>
        <Row>
          <Slot width={200} height={200}>
            {CharacterComponent && <CharacterComponent {...character} />}
          </Slot>
          <Slot padding="24px 16px">
            <Info {...character} />
          </Slot>
        </Row>
        <Slot padding="24px 16px">
          <Resistance resistance={character.resistance} />
        </Slot>
        <Abilities abilities={character.abilities} />
      </Content>
    </Dialog>
  );
};
