async function customFetch(request: RequestInfo, init?: RequestInit) {
  const response = await window.fetch(request, {
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json(); // Try to parse JSON for error details
    } catch (parseError) {
      // If parsing fails, create a basic error with the status text
      errorData = { message: response.statusText };
    }

    const error = new Error(errorData.message);
    error.name = `HTTP Error ${response.status}`;

    if (errorData.validationErrors) {
      // @ts-expect-error This is a custom property we're adding to the error
      error.validationErrors = errorData.validationErrors;
    }

    throw error;
  }

  return response;
}

export default customFetch;
