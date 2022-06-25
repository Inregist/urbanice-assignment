import { Contact } from '../../../models/Contact.model';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';
import ContactGroupService from './ContactGroupService';

const contacts: Contact[] = [];

const ID = z.string();

const ContactService = {
  create: (newContact: Contact) => {
    newContact.id = uuidV4();
    Contact.parse(newContact);

    newContact.groupId = newContact.groupId ?? 'other';
    ContactGroupService.create({
      contactId: newContact.id,
      groupId: newContact.groupId,
    });

    contacts.push(newContact);
    return newContact;
  },
  list: () => {
    return contacts;
  },
  findById: (id: string) => {
    ID.parse(id);
    return contacts.find((c) => id === c.id);
  },
  update: (id: string, newContact: Contact) => {
    ID.parse(id);
    if (!contacts.find((c) => id === c.id)) {
      return null;
    }

    Contact.omit({ id: true }).partial().parse(newContact);

    if (newContact.groupId) {
      ContactGroupService.update(id, newContact.groupId);
    }

    const index = contacts.findIndex((c) => c.id === id);
    contacts[index] = {
      ...contacts[index],
      ...newContact,
    };

    return contacts[index];
  },
  delete: (id: string) => {
    ID.parse(id);
    if (!contacts.find((c) => id === c.id)) {
      return null;
    }

    ContactGroupService.delete(id);

    const index = contacts.findIndex((c) => c.id === id);
    contacts.splice(index, 1);

    return id;
  },
};

export default ContactService;
