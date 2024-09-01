import {
  AdmonitionDirectiveDescriptor,
  MDXEditor,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  KitchenSinkToolbar,
} from "@mdxeditor/editor";

import { useField } from "formik";
import {
  YoutubeDirectiveDescriptor,
  virtuosoSampleSandpackConfig,
} from "./_boilerplate";

interface FormikRichTextProps {
  name: string;
  placeholder?: string;
}

function FormikRichText(props: FormikRichTextProps) {
  const [field, , helper] = useField(props.name);

  return (
    <MDXEditor
      {...field}
      className="dark-editor dark-theme   !bg-transparent border border-gray-700 rounded-md !text-white min-h-96 min-w-[36rem]"
      contentEditableClassName="!text-white"
      placeholder={props.placeholder && "description"}
      markdown={field.value ?? ""}
      onChange={(md) => {
        helper.setValue(md);
      }}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <KitchenSinkToolbar />
            </>
          ),
        }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
        sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS", txt: "text" },
        }),
        directivesPlugin({
          directiveDescriptors: [
            YoutubeDirectiveDescriptor,
            AdmonitionDirectiveDescriptor,
          ],
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
        markdownShortcutPlugin(),
      ]}
    />
  );
}

export default FormikRichText;
