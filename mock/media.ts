import faker from 'faker';
import { Response, Request } from 'express';
import { IMediaData } from '../src/api/types';
import { randomGuid } from './helpers';

let mediaList: IMediaData[] = [];
const mediaCount = 100;

for (let i = 0; i < mediaCount; i++) {
  mediaList.push({
    guid: randomGuid(),
    title: faker.random
      .words(3)
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    type: faker.random.arrayElement(['CD', 'DVD', 'BluRay', 'Online']),
    kind: faker.random.arrayElement(['Game', 'Music', 'Media']),
    number_of_discs: faker.random.number({ min: 1, max: 3 }),
    release_year: faker.random.number({ min: 1990, max: 2020 }),
  });
}

export const getMedias = (req: Request, res: Response) => {
  const { title, type, kind } = req.query;

  let mockList = mediaList.filter((item) => {
    if (title && item.title !== title) return false;
    if (type && item.type !== type) return false;
    if (kind && item.kind !== kind) return false;
    return true;
  });

  return res.json({
    code: 200,
    items: mockList,
    data: {
      total: mockList.length,
      items: mockList,
    },
  });
};

export const getMedia = (req: Request, res: Response) => {
  const { guid } = req.params;
  for (const media of mediaList) {
    if (media.guid.toString() === guid) {
      return res.json({
        code: 200,
        data: {
          media,
        },
      });
    }
  }
  return res.status(404).send({
    code: 404,
    message: 'Media not found',
  });
};

export const createMedia = (req: Request, res: Response) => {
  const { body } = req;
  body.guid = randomGuid();
  mediaList.push(body);
  return res.json({
    code: 200,
    data: {
      body,
    },
  });
};

export const updateMedia = (req: Request, res: Response) => {
  const { guid } = req.params;
  const { body } = req;
  const indexToEdit = mediaList.findIndex((m) => m.guid === guid);
  if (indexToEdit > -1) {
    mediaList.splice(indexToEdit, 1, body);
    return res.json({
      code: 200,
      data: {
        body,
      },
    });
  } else {
    return res.status(404).send({
      code: 404,
      message: 'Media not found',
    });
  }
};

export const deleteMedia = (req: Request, res: Response) => {
  const { guid } = req.params;
  const indexToDelete = mediaList.findIndex((m) => m.guid === guid);
  if (indexToDelete > -1) {
    mediaList.splice(indexToDelete, 1);
    return res.json({
      code: 200,
    });
  } else {
    return res.status(404).send({
      code: 404,
      message: 'Media not found',
    });
  }
};
