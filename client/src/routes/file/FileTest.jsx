import React, { useState } from "react";

function FileTest() {
  const [file, setFile] = useState(null);

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const Click = () => {
    const formData = new FormData();
    formData.append("files", file);

    console.log(formData);
    console.log(Array.from(formData));

    const res = fetch("/upload/file", {
      method: "POST",

      body: formData,
    });
  };

  const onClickButton = () => {
    fetch("/download/file/examplefile")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.setAttribute("href", url);
        link.setAttribute("download", "function.pdf");

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);

        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div>
      <input type="file" onChange={onChangeFile} />

      <button onClick={Click}>업로드</button>

      <button onClick={onClickButton}>다운로드</button>
    </div>
  );
}

export default FileTest;
