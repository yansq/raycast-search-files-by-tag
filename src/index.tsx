import { ActionPanel, List, Action } from "@raycast/api";
import { useEffect, useState } from "react";
import { useExec } from "@raycast/utils";
import { showInFinder } from "@raycast/api";
//import fs from "node:fs";

export default function Command() {
  const [searchContent, setSearchContent] = useState(["", ""]);
  const [files, setFiles] = useState([]);
  const { isLoading, data } = useExec(`mdfind 'tag:${searchContent[0] === "" ? "ZZZZZZ" : searchContent[0]}'`, {shell: true, keepPreviousData: true});

  useEffect(() => {
    if (data) {
      let files = data.split(/\r?\n/)
      if (searchContent[1]) {
        files = files.filter((item) => item.includes(searchContent[1]));
      }
      setFiles(files);
    }
  }, [data, searchContent[1]]);

  const updateSearch = (str: string) => {
    const newContent = [str.split(" ")[0], str.split(" ")[1]];
    console.log(newContent);
    setSearchContent(newContent);
  }
  
  //const getMetaData = (id: string | null) => {
    //if (id) {
      //fs.stat(id, (err, stat) => {
        //console.log(stat)
      //})
    //}
  //}

  return (
    <List 
      filtering={false}
      onSearchTextChange={updateSearch}
      //onSelectionChange={getMetaData}
    >
      {files.map((item) => (
        <List.Item
          key={item}
          id={item}
          title={item}
          actions={
            <ActionPanel>
              <Action title="Show in Finder" onAction={() => showInFinder(item)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
