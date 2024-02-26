// Importing necessary dependencies from react-router-dom and contacts module
import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

// Async function to handle updating the contact's favorite status
export async function action({ request, params }) {
  // Retrieve form data from the request
  let formData = await request.formData();
  
  // Update the contact's favorite status based on the form data
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}


// Async function to load contact details for the specified contactId
export async function loader({ params }) {
  // Retrieve contact details for the specified contactId
  const contact = await getContact(params.contactId);
  
  // If no contact is found, throw a 404 Not Found error
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  
  // Return the loaded contact details
  return { contact };
}

// React component for displaying contact details
export default function Contact() {
  // Load contact details using useLoaderData hook
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        {/* Display contact avatar */}
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {/* Display contact name and favorite status */}
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            {/* Display Twitter handle as a link */}
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          {/* Form for navigating to the edit page */}
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          
          {/* Form for deleting the contact with a confirmation prompt */}
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm("Please confirm you want to delete this record.")
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// React component for displaying and updating the favorite status
function Favorite({ contact }) {
  // Use the useFetcher hook to handle form submission
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  // Update the favorite status based on the fetcher's form data
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    // Form for updating the favorite status
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}