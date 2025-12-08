console.log("Generating git-info.json");

import { $ } from "bun";

//check if git is available
$`git --version`.catch(() => {
  console.warn("Git is not available. Skipping git-info.json generation.");
  process.exit(0);
});

$`git rev-parse --abbrev-ref HEAD`.then((branch) => {
  $`git rev-parse --short HEAD`.then((commit) => {
    const gitInfo = {
      branch: branch.text().trim(),
      commit: commit.text().trim(),
    };

    Bun.file("src/git-info.json").write(JSON.stringify(gitInfo, null, 2));
    console.log("git-info.json generated:", gitInfo);
  });
});
