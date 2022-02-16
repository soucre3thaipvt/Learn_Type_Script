export {};
// Implement Interface

interface Pet {
  name: string;
}
interface Address {
  city: string;
}
interface Contact {
  name: string;
  phone: string;
  email?: string;
  pet?: Pet;
  addresses?: Address[];
}
// khoi tao kho chua Contact, array
const contact: Contact[] = [];

// tao new Contact // object literal
const newContact: Contact = {
  name: 'Nguyen Van A',
  phone: '0322324143',
  email: 'abc@gmail.com',
  pet: {
    name: 'A',
  },
};
// push data
contact.push(newContact);

const otherContact: Contact = {
  name: 'Nguyen Van B',
  phone: '0322324143',
};
function getPetName(contact: Contact): string {
  return contact.pet?.name || 'Null';
  // neu pet.name underfind thi return ''
}

function getFistAddresses(contact: Contact) {
  return contact.addresses?.[0];
}

console.log(getPetName(newContact));
console.log(getPetName(otherContact));

interface Button {
  label: string;
  onClick: () => void; // ham callback
}
const button: Button = {
  label: 'Submit',
  onClick: () => {
    console.log('click');
  },
};

interface IconButton extends Button {
  icon: string;
}
const addToCartBtn: IconButton = {
  label: 'Submit',
  onClick: () => {
    console.log('click');
  },
  icon: 'cart-icon',
};

class MyContact implements Contact {
  name: string;
  phone: string;
  constructor(name: string, phone: string) {
    this.name = name;
    this.phone = phone;
  }
}
const a = new MyContact('Ahihi', '0329324');
console.log(a.name);

interface ContactAdapter {
  // Neu lay data tu api
  getData: () => Promise<Contact[]>;
}
class ContactApp {
  adapter: ContactAdapter;
  constructor(adapter: ContactAdapter) {
    this.adapter = adapter;
  }
  async render() {
    const contacts: Contact[] =
      await this.adapter.getData();
    console.table(contacts);
  }
}

class MyContactAdapter implements ContactAdapter {
  async getData() {
    // get data from API
    const contacts: Contact[] = [
      { name: 'A', phone: '123' },
      { name: 'B', phone: '456' },
    ];
    return contacts;
  }
}
const adapter = new MyContactAdapter();
const app = new ContactApp(adapter);
app.render();
