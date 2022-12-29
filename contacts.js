const fs = require("fs").promises;
const path = require("path");
const uniqid = require("uniqid");
const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
    try {
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    } catch (error) {
        console.log(error.message);
    }
};

const getContactById =async (Id) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.filter(({ id }) => id === Id);
        return contact;
    }
    catch (error) {
        console.log(error.message);
    }
};

const removeContact =async (Id) => {
    try {
        const contact = await getContactById(Id);
        const contacts = await listContacts();
        const newContacts = contacts.filter(({ id }) => id !== Id);
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        return contact;
    } catch (error) {
        console.log(error.message);
    }
};
const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = { id: uniqid(),  name, email, phone };
        const newContacts = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};