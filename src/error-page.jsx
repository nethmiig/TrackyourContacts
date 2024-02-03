// Import the useRouteError hook from react-router-dom
import { useRouteError } from "react-router-dom";

// Define the ErrorPage component
export default function ErrorPage() {
  // Retrieve the route error using the useRouteError hook
  const error = useRouteError();

  // Log the error to the console
  console.error(error);

  // Render the error page content
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* Display the error status text or message in italics */}
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}