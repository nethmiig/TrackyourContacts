// Import necessary modules and components from react-router-dom and other sources
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";

// Async function to handle creating a new contact and redirecting to its edit page
export async function action() {
  // Create a new contact
  const contact = await createContact();
  
  // Redirect to the edit page of the newly created contact
  return redirect(`/contacts/${contact.id}/edit`);
}

// Async function to load contacts based on a search query
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  
  // Load contacts based on the search query
  const contacts = await getContacts(q);
  
  // Return contacts and the search query
  return { contacts, q };
}

// React component for the root of the application
export default function Root() {
  // Load data using useLoaderData hook
  const { contacts, q } = useLoaderData();
  
  // Access the navigation object using useNavigation hook
  const navigation = useNavigation();

  // Update the search input field when the search query changes
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  // Use the useSubmit hook to handle form submission
  const submit = useSubmit();

  // Determine if the application is currently in a searching state
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  // Render the root component with sidebar and detail sections
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* Search form */}
          <form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                // Submit the form on search input change
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          
          {/* Form for creating a new contact */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {/* Display contacts in a list */}
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* NavLink for navigating to individual contact detail page */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {/* Display contact name and favorite status */}
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              {/* Display a message if there are no contacts */}
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        {/* Render the Outlet, which will display the content of the child route */}
        <Outlet />
      </div>
    </>
  );
}
