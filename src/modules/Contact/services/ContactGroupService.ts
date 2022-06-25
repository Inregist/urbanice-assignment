import { z } from 'zod';
import { ContactGroup } from '../../../models/ContactGroup.model';
import ContactService from './ContactService';
import GroupService from './GroupService';
import _ from 'lodash';
import { Contact } from '../../../models/Contact.model';

const contactGroups: ContactGroup[] = [];
const ID = z.string();

const CreateContactGroupInput = z.object({
  contactId: z.string(),
  groupId: z.string().refine((gid) => GroupService.findById(gid), {
    message: `group id does not exists`,
  }),
});

const ContactGroupResult = z.object({
  groupId: z.string(),
  groupName: z.string(),
  contacts: z.array(Contact),
});

export type CreateContactGroupInput = z.infer<typeof CreateContactGroupInput>;
export type ContactGroupResult = z.infer<typeof ContactGroupResult>;

const ContactGroupService = {
  create: (newContactGroup: CreateContactGroupInput) => {
    CreateContactGroupInput.parse(newContactGroup);
    contactGroups.push(newContactGroup);
    return newContactGroup;
  },
  list: () => {
    const groupDict = _.chain(GroupService.list()).keyBy('groupId').value();

    const contactGroupResult = _.chain(ContactService.list())
      .groupBy('groupId')
      .map(
        (values, key): ContactGroupResult => ({
          groupId: key,
          groupName: groupDict[key].groupName,
          contacts: values,
        })
      )
      .value();

    return contactGroupResult;
  },
  listByGroup: (id: string) => {
    ID.parse(id);
    const group = GroupService.list().find((g) => g.id === id);

    if (!group) {
      return null;
    }

    const contacts = ContactService.list().filter(
      ({ groupId }) => id == groupId
    );

    const contactGroupResult: ContactGroupResult = {
      groupId: group.id,
      groupName: group.groupName,
      contacts,
    };

    return contactGroupResult;
  },
  update: (contactId: string, newGroupId: string) => {
    ID.refine((gid) => GroupService.findById(gid), {
      message: 'contact not found',
    }).parse(contactId);

    ID.refine((gid) => GroupService.findById(gid), {
      message: 'group not found',
    }).parse(newGroupId);

    const index = contactGroups.findIndex((cg) => cg.contactId === contactId);
    contactGroups[index].groupId = newGroupId;
  },
  delete: (contactId: string) => {
    ID.parse(contactId);
    const index = contactGroups.findIndex((cg) => cg.contactId === contactId);

    contactGroups.slice(index, 1);
    return contactId;
  },
};

export default ContactGroupService;
