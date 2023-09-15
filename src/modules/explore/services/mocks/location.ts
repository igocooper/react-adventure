import { createGrid } from '../../helpers/createGrid';

export const villageLocationMock = {
  backgroundSrc: '/images/locations/village/background.png',
  frontDecorSrc: '/images/locations/village/front-decor.png',
  grid: createGrid({
    blockedRows: [0, 1, 2, 3],
    columns: 53,
    rows: 10
  }),
  objects: [
    {
      type: 'tree',
      id: 1,
      src: '/images/locations/village/objects/tree2.png',
      gridPositions: [
        [5, 24],
        [5, 25]
      ],
      position: {
        x: 2300,
        y: 90
      }
    },
    {
      type: 'tree',
      id: 2,
      src: '/images/locations/village/objects/tree1.png',
      gridPositions: [[4, 28]],
      position: {
        x: 2630,
        y: -10
      }
    },
    {
      type: 'house',
      id: 3,
      src: '/images/locations/village/objects/grocery house.png',
      gridPositions: [
        [0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12],
        [0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13],
        [0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14],
        [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15],
        [0, 16], [1, 16], [2, 16], [3, 16], [4, 16], [5, 16],
        [0, 17], [1, 17], [2, 17], [3, 17], [4, 17], [5, 17],
        [0, 18], [1, 18], [2, 18], [3, 18], [4, 18], [5, 18],
        [0, 19], [1, 19], [2, 19], [3, 19], [4, 19], [5, 19],
      ],
      position: {
        x: 1010,
        y: -110
      }
    }
  ]
};

export const castleLocationMock = {
  backgroundSrc: '/images/locations/castle-test.png',
  frontDecorSrc: '',
  grid: createGrid({
    blockedRows: [0, 1, 2],
    columns: 18,
    rows: 10
  }),
  objects: []
};
