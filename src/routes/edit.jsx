// Importing necessary dependencies from react-router-dom and contacts module
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";

// Async function that handles form submission and updates contact information
export async function action({ request, params }) {
  // Retrieve form data from the request
  const formData = await request.formData();
  
  // Convert form data into an object
  const updates = Object.fromEntries(formData);
  
  // Update the contact information using the contactId and the updates
  await updateContact(params.contactId, updates);
  
  // Redirect to the updated contact details page
  return redirect(`/contacts/${params.contactId}`);
}

// React component for editing contact details
export default function EditContact() {
  // Load contact data using useLoaderData hook
  const { contact } = useLoaderData();
  
  // Use the useNavigate hook to navigate within the application
  const navigate = useNavigate();

  return (
    // Form component for editing contact details
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        {/* Input fields for the first and last name with default values */}
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      {/* Input field for Twitter handle with default value */}
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      {/* Input field for Avatar URL with default value */}
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      {/* Textarea for entering contact notes with default value */}
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        {/* Save button triggers the form submission */}
        <button type="submit">Save</button>
        {/* Cancel button navigates back to the previous page */}
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </p>
    </Form>
  );
}