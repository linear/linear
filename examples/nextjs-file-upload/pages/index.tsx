import * as React from "react";

export default function Page(): JSX.Element {
  const [url, setUrl] = React.useState<string>();
  const [error, setError] = React.useState<string>();

  return (
    <div>
      <input
        type="file"
        onChange={async e => {
          setUrl(undefined);
          setError(undefined);

          const files = Array.from(e.currentTarget.files || []);
          const file = files[0];

          const formData = new FormData();
          formData.append("file", file);

          const result = await fetch("/api/uploadFileToLinear", {
            method: "POST",
            body: formData,
          });
          const json = await result.json();

          if (result.ok) {
            setUrl(json.url);
          } else {
            setError(JSON.stringify(json.error, null, 2));
          }

          // Reset the value to accept new files
          e.target.value = "";
        }}
      />

      {url && (
        <p>
          Success! File is uploaded to this URL:{" "}
          <a href={url} target="_blank">
            {url}
          </a>
        </p>
      )}

      {error && (
        <pre>
          Error
          {"\n\n"}
          {error}
        </pre>
      )}
    </div>
  );
}
