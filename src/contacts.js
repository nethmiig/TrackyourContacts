//Importing necessary libraries
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// Function to retrieve contacts based on a query and apply sorting
export async function getContacts(query) {
  // Simulate network delay
  await fakeNetwork(`getContacts:${query}`);
  
  // Retrieve contacts from local storage
  let contacts = await localforage.getItem("contacts");

  // If no contacts exist, initialize an empty array
  if (!contacts) contacts = [];

  // If a query is provided, filter and sort contacts based on the query
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }

  // Sort contacts by last name and creation date
  return contacts.sort(sortBy("last", "createdAt"));
}

// Function to create a new contact
export async function createContact() {
  // Simulate network delay
  await fakeNetwork();

  // Generate a random ID for the new contact
  let id = Math.random().toString(36).substring(2, 9);

  // Create a new contact object with the generated ID and current timestamp
  let contact = { id, createdAt: Date.now() };

  // Retrieve existing contacts
  let contacts = await getContacts();

  // Add the new contact to the beginning of the contacts array
  contacts.unshift(contact);

  // Update local storage with the modified contacts array
  await set(contacts);

  // Return the newly created contact
  return contact;
}

// Function to retrieve a specific contact by ID
export async function getContact(id) {
  // Simulate network delay
  await fakeNetwork(`contact:${id}`);

  // Retrieve contacts from local storage
  let contacts = await localforage.getItem("contacts");

  // Find and return the contact with the specified ID, or null if not found
  let contact = contacts.find(contact => contact.id === id);
  return contact ?? null;
}

// Function to update an existing contact by ID with provided updates
export async function updateContact(id, updates) {
  // Simulate network delay
  await fakeNetwork();

  // Retrieve contacts from local storage
  let contacts = await localforage.getItem("contacts");

  // Find the contact with the specified ID
  let contact = contacts.find(contact => contact.id === id);

  // Throw an error if the contact is not found
  if (!contact) throw new Error("No contact found for", id);

  // Apply updates to the contact object
  Object.assign(contact, updates);

  // Update local storage with the modified contacts array
  await set(contacts);

  // Return the updated contact
  return contact;
}

// Function to delete a contact by ID
export async function deleteContact(id) {
  // Retrieve contacts from local storage
  let contacts = await localforage.getItem("contacts");

  // Find the index of the contact with the specified ID
  let index = contacts.findIndex(contact => contact.id === id);

  // If the contact is found, remove it from the contacts array
  if (index > -1) {
    contacts.splice(index, 1);
    
    // Update local storage with the modified contacts array
    await set(contacts);

    // Return true indicating successful deletion
    return true;
  }

  // Return false if the contact with the specified ID is not found
  return false;
}

// Function to update local storage with the provided contacts array
function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// Simulate caching and network delays
let fakeCache = {};

async function fakeNetwork(key) {
  // Clear the fake cache if no key is provided
  if (!key) {
    fakeCache = {};
  }

  // If the key is already in the fake cache, return immediately
  if (fakeCache[key]) {
    return;
  }

  // Add the key to the fake cache and introduce a random delay
  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}