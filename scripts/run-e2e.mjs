import { spawn, spawnSync } from "node:child_process";
import process from "node:process";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";
const playwrightCommand = isWindows
  ? "node_modules\\.bin\\playwright.cmd"
  : "node_modules/.bin/playwright";
const previewUrl = "http://127.0.0.1:4321";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      shell: isWindows,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`${command} ${args.join(" ")} exited with code ${code}`),
        );
      }
    });
  });
}

function stopProcessTree(child) {
  if (!child?.pid) {
    return;
  }

  if (isWindows) {
    spawnSync("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
      stdio: "ignore",
    });
  } else {
    child.kill("SIGTERM");
  }
}

async function waitForServer(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(previewUrl);
      if (response.ok) {
        return;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  throw new Error(`Preview server did not respond at ${previewUrl}`);
}

let exitCode = 0;
let preview;

try {
  await run(npmCommand, ["run", "build"]);

  preview = spawn(npmCommand, ["run", "preview", "--", "--host", "127.0.0.1"], {
    shell: isWindows,
    stdio: "inherit",
  });

  await waitForServer();
  await run(playwrightCommand, ["test"]);
} catch (error) {
  console.error(error);
  exitCode = 1;
} finally {
  stopProcessTree(preview);
  process.exit(exitCode);
}
