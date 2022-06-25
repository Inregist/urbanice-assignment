import { Group } from '../../../models/Group.model';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';
import ContactGroupService from './ContactGroupService';

const groups: Group[] = [{ id: 'other', groupName: 'Other' }];

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
    ID.refine((gid) => gid !== 'other', {
      message: 'group name "Other" is reserved',
    }).parse(id);

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
    ID.refine((gid) => gid !== 'other', {
      message: 'group name "Other" is reserved',
    }).parse(id);
    if (!groups.find((g) => id === g.id)) {
      return null;
    }

    if ((ContactGroupService.listByGroup(id)?.contacts?.length ?? 0) > 0) {
      throw new Error('group is not empty');
    }

    const index = groups.findIndex((c) => c.id === id);
    groups.splice(index, 1);

    return id;
  },
};

export default GroupService;
