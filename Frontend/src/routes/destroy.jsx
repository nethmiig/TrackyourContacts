import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

// Action function to handle deletion of a contact
export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
