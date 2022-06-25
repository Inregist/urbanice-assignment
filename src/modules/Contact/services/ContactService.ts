import { Contact } from '../../../models/Contact.model';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';

const contacts: Contact[] = [];

const ID = z.string();

const ContactService = {
  create: (newContact: Contact) => {
    newContact.id = uuidV4();
    Contact.parse(newContact);

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
    const index = contacts.findIndex((c) => c.id === id);
    contacts.splice(index, 1);

    return id;
  },
};

export default ContactService;
