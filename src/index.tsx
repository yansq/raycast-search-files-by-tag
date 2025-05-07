import { ActionPanel, List, Action, useNavigation } from "@raycast/api";
import { useState, useMemo } from "react";
import { useExec } from "@raycast/utils";
import { showInFinder } from "@raycast/api";

export default function Command() {
  const [searchContent, setSearchContent] = useState(["", ""]);
  const { data } = useExec(`mdfind 'tag:${searchContent[0] === "" ? "ZZZZZZ" : searchContent[0]}'`, {
    shell: true,
    keepPreviousData: true,
  });
  const { pop } = useNavigation();

  const files: string[] = useMemo(() => {
    if (data) {
      let files = data.split(/\r?\n/);
      if (searchContent[1]) {
        files = files.filter((item) => item.includes(searchContent[1]));
      }
      return files;
    } else {
      return [];
    }
  }, [data, searchContent[1]]);

  const updateSearch = (str: string) => {
    const [tag, content] = str.split(" ");
    setSearchContent([tag, content]);
  };

  return (
    <List filtering={false} onSearchTextChange={updateSearch}>
      {files.map((item) => (
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
