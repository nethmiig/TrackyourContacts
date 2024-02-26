import { useRouteError } from "react-router-dom";

// React component representing an error page
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
      <div id="error-page">
        <h1>Sorry</h1>
        <p> An unexpected error has occured.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
      </div>
    );
}