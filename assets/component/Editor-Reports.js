import React, { useRef, useEffect } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import plugins from "suneditor/src/plugins";
import { templates } from "suneditor/src/plugins";
import "suneditor/src/assets/css/suneditor.css";
const Editor = (props) => {
  const editor = useRef();

  const defaultValueRapport =
    "<b><u>Nom(s) du travailleur :</u></b><br><br><b><u>Résumé :</u></b><br><br><b><u>Bien-être :</u></b><br><br><b><u>Logement :</u></b><br><br><b><u>Médical :</u></b><br><br><b><u>Social :</u></b><br>";
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const handleOnResizeEditor = (height, prevHeight) => {};

  const onChangeEditor = (contents, core) => {
    props.onChange(contents);
  };
  return (
    <div>
      <SunEditor
        code="fr"
        defaultValue={props.content}
        lang="fr"
        onChange={onChangeEditor}
        setOptions={{
          height: 200,
          plugins: plugins,
          buttonList: [
            ["undo", "redo"],

            // ["font", "fontSize", "formatBlock"],
            // ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor"],
            ["removeFormat"],
            // "/", // Line break

            ["outdent", "indent"],

            [
              // "table",
              "link",
              "image",
              // "audio" /** ,'math' */
            ], // You must add the 'katex' library at options to use the 'math' plugin.
            // ["imageGallery"], // You must add the "imageGalleryUrl".
            // ["fullScreen"],
            // ["preview", "print"],
            ["list"],
            // ["save", "template"],
            /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
          ],
        }}
        setAllPlugins={true}
        setDefaultStyle="font-family: Arial; font-size: 15px;"
        onResizeEditor={handleOnResizeEditor}
      />
    </div>
  );
};
export default Editor;
