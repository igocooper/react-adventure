## Abilities

Describe special skills of some character, character might have them by default or get one by wearing equipment (weapon, armor, helmet).

"Ability" could be of 2 types:

- curses
- buffs

"Curses" applies on trooper attack and could add some negative effect on the enemy trooper.

"Buffs" applies during support and could add some positive effects on the ally trooper.

Each ability has a chance to succeed, only in case of success effect is applied.

```typescript
type Ability = {
  name: AbilityName;
  type: AbilityType;
  hitChance?: number;
  applyAbility: (props: ApplyAbilityProps) => void;
};
```

- `name` - ability name
- `type` - type of ability which is either `curse` or `buff`. It decides when ability would be applied.
- `hitChance` - [optional] number between `1-100`, which represents percentage of success rate.
- `applyAbility` - generator function which would be called inside Redux Saga with target trooper info passed inside. This function is responsible for:
  - adding `effect` to the target trooper (either ally or enemy)
  - for visual representation of ability effect.

## EFFECTS

Are side effects applied to the trooper on the battlefield right after his turn has started. Effects could modify trooper stats (encrease / decrease), also it might damage trooper or make him skip his turn.

"Effect" could have one time effect or continues effect.

- `one time effect` applies once and keep it's state till the end of the effect. For instance `might` which increase trooper damage.
- ` continues effect` applies each turn till the end of the effect. For instance `poison` which damage user for constant amount of HP.

```typescript
type Effect = {
  name: EffectName;
  duration: number;
  iconSrc: string;
  once?: boolean;
  applyEffect: ApplyEffect | ApplyDelayedEffect;
  cancelEffect?: (props: ApplyEffectProps) => void;
  done: boolean;
};
```

- `name` - effect name
- `duration` - number of rounds until effect expires and get removed.
- `iconSrc` - url to the icon which will be display in UI when effect is applied.
- `once` - [optional] flag based on which effect runs once or each turn while being applied.
- `applyEffect` - generator function which would be called inside Redux Saga with target trooper info passed inside. This function is responsible for:
  - performing effect changes (modify stats, damage, skip turn etc)
  - for visual representation of effect on the target trooper.
  - it could return function which would delay run of the "effect". See ["Delayed Effects"](#delayed-effects)
- `canceEffect` - [optional] generator function which would be called inside Redux Saga with target trooper info passed inside when effect is done. This function is responsible for:
  - reverting effect changes if needed (revert stats)
- `done` - internal flag used to implement one time effects

### Delayed Effects

Sometimes you need to delay an effect to make sure it's being applied last. For instance with "anchor" effect you basically skip trooper turn and that would eventually stop other possible effects application, as effects are in random order.

For that you can mark this effect as "delayed" by simply returning another function from `applyEffect`.

```typescript
const AnchorEffect = {
  name: 'anchor',
  duration: 2,
  iconSrc: '/public/icons/anchor.png',
  applyEffect: () => {
    // here you run sync effect
    runAnchorAnimation();
    return () => {
      // here you run part of the effect which would run only all other effects has applied
      skipTrooperTurn();
    };
  }
};
```

## Visualisation of the effects and abilities

Basically you aren't limited to any animation you could implement yourself which could be run inside `applyEffect()` or `applyAbility()` function.

However we have 2 common animation component design for your convenience:

- `EffectAnimation` component in `modules/animation/containers/EffectAnimation`
- `SpriteAnimation` component in `modules/animation/containers/SpriteAnimation`

### EffectAnimation

Is a generic component which renders fade animation of the effect it could be slightly changed via props to customize an effect.

It registers animation effect in `areaEffectsAnimationInstances` collection where you can then get it and run inside `applyEffect()` function.

It also covers proper position of the animation based on target trooper id and container node.

```typescript
type Props = {
  containerNode: HTMLDivElement;
  animationDuration: number;
  trooperId?: Trooper['id'];
  attackId: EffectName;
  imageWidth: number;
  imageHeight: number;
  imageUrl: string;
};
```

- `containerNode` - node where troopers are rendered, used for detecting trooper position
- `animationDuration` - customise duration of the fade effect
- `trooperId` - id of the trooper which should be affected. Used to detect it's position
- `attackId` - name which will be used to register animation in `areaEffectsAnimationInstances` collection, which you later use to get it
- `imageWidth` - width of the image
- `imageHeight` - height of the image
- `imageUrl` - image source

### SpriteAnimation

Is a generic component which renders sprite animation it could be slightly changed via props to customize an effect.

It registers animation effect in `areaEffectsAnimationInstances` collection where you can then get it and run inside `applyEffect()` function.

```typescript
type Props = {
  attackId?: string;
  src: string;
  frames: Frames;
  position: {
    x: number | string;
    y: number | string;
  };
  className?: string;
  fps?: number;
};
```

- `attackId` - name which will be used to register animation in `areaEffectsAnimationInstances` collection, which you later use to get it
- `src` - sprite image source
- `frames` - object describing each frame
- `position` - position object with `x` and `y` coordinates where the animation should be positioned
- `className` - [optional] class which will be passed to root node rendered by the component
- `fps` - speed of the sprite animation

**NOTE:** Both animation component should be rendered in `AnimationAreaContainer` located in `modules/battlefield/containers/AnimationAreaContainer` to work properly.

You can render it inside `AnimationAreaContainer` directly as some common effect like "block" do.

See example `modules/battlefield/containers/AnimationAreaContainer/Block`

or you can render it there using portal as some unique characters are doing. See example for "Kraken" animation in `modules/battlefield/characters/WaterMage/Kraken`
