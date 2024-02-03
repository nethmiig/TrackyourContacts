import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
    try {
        // Delete the contact
        await deleteContact(params.contactId);
        
        // Redirect to the home page after successful deletion
        return redirect("/");
    } catch (error) {
        // Handle errors, for example, log them or redirect to an error page
        console.error("Error deleting contact:", error);
        throw new Error("Failed to delete contact.");
    }
}