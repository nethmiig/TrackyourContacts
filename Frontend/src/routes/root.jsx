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

// Action function to create a new contact and redirect to its edit page
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

// Loader function to fetch contacts based on the search query
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return {contacts, q};
}

// React component representing the Root of the application
export default function Root() {
  // Retrieve contacts and search query from useLoaderData
  const {contacts, q } = useLoaderData();

  // Access the navigation, submit, and other hooks
  const navigation = useNavigation();
  const submit = useSubmit();

  // Check if searching based on the current navigation location
  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );
  // Set the value of the search input when the search query changes
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
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
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
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
              <i>No contacts</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"
          className={
            navigation.state === "loading" ? "loading" : ""
          }
        >
          <Outlet />
        </div>
      </>
    );
  }