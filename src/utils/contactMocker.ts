import { Contact } from '../models/Contact.model';
import { Group } from '../models/Group.model';
import { ContactService, GroupService } from '../modules/Contact/services';

const mockGroups: Group[] = [
  {
    id: 'family',
    groupName: 'Family',
  },
  {
    id: 'office',
    groupName: 'Office',
  },
  {
    id: 'close-friend',
    groupName: 'Close Friend',
  },
];

const mockContacts: Contact[] = [
  {
    id: 'dad',
    firstName: 'Dad',
    groupId: 'family',
  },
  {
    id: 'sister',
    firstName: 'Sister',
    groupId: 'family',
  },
  {
    id: 'john',
    firstName: 'John',
    groupId: 'office',
  },
  {
    id: 'lisa',
    firstName: 'Lisa',
    groupId: 'close-friend',
  },
];

const ContactMocker = {
  mockGroups: () => {
    mockGroups.forEach((group) => {
      GroupService.create(group);
    });
  },

  mockContacts: () => {
    mockContacts.forEach((contact) => {
      ContactService.create(contact);
    });
  },
};

export default ContactMocker;
