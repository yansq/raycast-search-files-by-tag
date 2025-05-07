import { ActionPanel, List, Action, useNavigation } from "@raycast/api";
import { useState } from "react";
import { useExec } from "@raycast/utils";
import { showInFinder } from "@raycast/api";

export default function Command() {
  const { pop } = useNavigation();
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
                  pop();
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
