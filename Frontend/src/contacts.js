import axios from 'axios';
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// Base URL for the backend API
const BASE_URL = 'http://localhost:3000';
const CONTACTS_ENDPOINT = "/contacts";

// Helper function to handle API response
const handleResponse = (response) => {
  if (!response.data) {
    throw new Error("Invalid response format");
  }
  return response.data;
};

// Helper function to build contact-specific URL
const buildContactUrl = (id = "") => `${BASE_URL}${CONTACTS_ENDPOINT}/${id}`;

// Function to fetch contacts from the backend
const fetchContacts = async () => {
  try {
    const response = await axios.get(buildContactUrl());
    return response.data || [];
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// Function to filter contacts based on a query
const filterContacts = (contacts, query) => {
  return query ? matchSorter(contacts, query, { keys: ["first", "last"] }) : contacts;
};

// Function to sort contacts by last name and creation date
const sortContacts = (contacts) => {
  return contacts.sort(sortBy("last", "createdAt"));
};

// Function to get contacts with optional query parameter
export const getContacts = async (query) => {
  try {
    // Fetch contacts from the backend
    const contacts = await fetchContacts();
    // Filter and sort contacts based on the query
    const filteredContacts = filterContacts(contacts, query);
    return sortContacts(filteredContacts);
  } catch (error) {
    // Handle and rethrow errors
    throw error;
  }
};

// Function to create a new contact
export const createContact = async () => {
  try {
    // Make a POST request to create a new contact
    const response = await axios.post(buildContactUrl());
    // Handle the API response
    return handleResponse(response);
  } catch (error) {
    // Handle and log errors
    console.error("Error creating contact:", error);
    throw error;
  }
};

// Function to get a specific contact by ID
export const getContact = async (id) => {
  try {
    // Make a GET request to retrieve a contact by ID
    const response = await axios.get(buildContactUrl(id));
    // Handle the API response
    return handleResponse(response);
  } catch (error) {
    // Handle and log errors
    console.error(`Error fetching contact with ID ${id}:`, error);
    throw error;
  }
};

// Function to update an existing contact with new information
export const updateContact = async (id, updates) => {
  try {
    // Make a PUT request to update a contact by ID
    const response = await axios.put(buildContactUrl(id), updates);
    // Handle the API response
    return handleResponse(response);
  } catch (error) {
    // Handle and log errors
    console.error(`Error updating contact with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a contact by ID
export const deleteContact = async (id) => {
  try {
    // Make a DELETE request to delete a contact by ID
    await axios.delete(buildContactUrl(id));
    // If successful, return true
    return true;
  } catch (error) {
    // Handle and log errors
    console.error(`Error deleting contact with ID ${id}:`, error);
    throw error;
  }
};
