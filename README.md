# react-adventure

React Adventure is a game written with React / Redux

## Battlefield

Game battle system was inspired by old arcade game "Disciples II". It's a turn by turn combat between 2 teams each of which consist of 1-6 characters.

#### Troopers' position

Each team character placement does matter in the battlefield. There are 2 rows: front and back. Each row has 3 slots.

```
 [6, 1]   [1, 6]
 [5, 2]   [2, 5]
 [4, 3]   [3, 4]
```

Front row is represented by troopers at the position `1-3`, and back row is represented by troopers at the position `4-6`.

#### Attack constraints

This is important for troopers with "Melee" attack type. As they have special constraints applied.

"Melee" trooper cannot attack anyone on the 2nd row if at least one trooper in the front row is still alive. Also "Melee" trooper can attack only nearby troops.

For instance trooper at position `2` can attack everyone in the front row, but trooper at position `3` cannot attack trooper at position `1` before killing enemy at `2` and `3` and vice versa trooper at position `1` cannot attack enemy at position `3` before killing enemies at `2` and `1`.

#### Attack Types

Despite "Melee" trooper we have 2 more attack types. 

- Melee
- Range
- Splash

"Range" trooper can attack anyone without constraints.

"Splash" trooper attacks each enemy at the same time.

### Round System

Each battlefield consists of rounds and turns.

#### "Turn" - represent action of each individual trooper.

During it's turn trooper can either `attack`, `wait`, `block` or `support` ally (if available).

 - "Attack" - hits enemies and applies curses (if available).

 - "Block" - increase trooper defence so he will receive less damage when attacked.

 - "Wait" - skip current turn, but put trooper into end of the list for the same round. So he will still make his turn last.

 - "Support" - support ally, by providing "buff" or "heal". Not all troopers can do that.

At the beginning of the trooper turn all `effects` are applied. `Effect` could be of different type, it might increase / decrease trooper properties or heal / damage trooper.
Effects have counter which show you how long effect would take place. 

#### "Round" - represent set of all troopers' turns.

At the beginning of each round queue of troopers' turns is created based on each trooper `initiative`. So those troopers who have higher `initiative` makes their turn earlier.

Battle ends when one of the team is defeated.

### Adding new Character

- add new folder with character assets in public/images
- add character weapon in public/images/[weapon-kind]
- add character object in /src/factory/characters describing your character properties
- add weapon object in /src/factory/[weapon-type].ts describing weapon properties
- [optional] add character component to /src/modules/battlefield/[Character] (you need it if you want him to use custom range attack animation or to overwrite his default character animation map)
