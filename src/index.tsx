import { ActionPanel, List, Action, showInFinder } from "@raycast/api";
import { useState } from "react";
import { useExec } from "@raycast/utils";

export default function Command() {
  const [[tag, content], setSearchContent] = useState(["", ""]);
  const { data } = useExec("mdfind", [tag && `tag:${tag}`], {
    shell: true,
    execute: !!tag,
  });

  let files = data?.split(/\r?\n/);
  files = tag && content ? files?.filter((item) => item.includes(content)) : files;

  const updateSearch = (str: string) => {
    if (str.trim() === "") {
      return;
    }
    const [tag, content] = str.split(/ (.*)/s);
    setSearchContent([tag, content]);
  };

  return (
    <List filtering={false} onSearchTextChange={updateSearch}>
      {files?.map((item) => (
        <List.Item
          key={item}
          id={item}
          title={item}
          actions={
            <ActionPanel>
              <Action
                title="Show in Finder"
                onAction={() => {
                  showInFinder(item);
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
