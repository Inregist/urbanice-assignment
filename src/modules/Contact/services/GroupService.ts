import { Group } from '../../../models/Group.model';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';

const groups: Group[] = [];

const ID = z.string();

const GroupService = {
  create: (newGroup: Group) => {
    newGroup.id = uuidV4();
    Group.parse(newGroup);

    groups.push(newGroup);
    return newGroup;
  },
  list: () => {
    return groups;
  },
  findById: (id: string) => {
    ID.parse(id);
    return groups.find((g) => id === g.id);
  },
  update: (id: string, newGroup: Group) => {
    ID.parse(id);
    if (!groups.find((c) => id === c.id)) {
      return null;
    }

    Group.omit({ id: true }).parse(newGroup);

    const index = groups.findIndex((c) => c.id === id);
    groups[index] = {
      ...groups[index],
      ...newGroup,
    };

    return groups[index];
  },
  delete: (id: string) => {
    ID.parse(id);
    if (!groups.find((g) => id === g.id)) {
      return null;
    }
    const index = groups.findIndex((c) => c.id === id);
    groups.splice(index);

    return id;
  },
};

export default GroupService;
