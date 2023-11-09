import { ActionPanel, List, Action } from "@raycast/api";
import { useEffect, useState } from "react";
import { useExec } from "@raycast/utils";
import { showInFinder } from "@raycast/api";
//import fs from "node:fs";

export default function Command() {
  const [searchTag, setSearchTag] = useState("");
  const [files, setFiles] = useState([]);
  const { isLoading, data } = useExec(`mdfind 'tag:${searchTag === "" ? "ZZZZZZ" : searchTag}'`, {shell: true, keepPreviousData: true});

  useEffect(() => {
    if (data) {
      setFiles(data.split(/\r?\n/));
    }
  }, [data]);
  
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
      onSearchTextChange={setSearchTag}
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
