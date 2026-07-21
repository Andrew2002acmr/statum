import { spawn, spawnSync } from "node:child_process";
import process from "node:process";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";
const playwrightCommand = isWindows
  ? "node_modules\\.bin\\playwright.cmd"
  : "node_modules/.bin/playwright";
const basePreviewPort = Number(process.env.PLAYWRIGHT_PREVIEW_PORT ?? "4322");

function run(command, args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env,
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

function createE2eEnv(mockResult = "success") {
  return {
    ...process.env,
    NODE_ENV: "test",
    LEAD_DELIVERY_MODE: "mock",
    MOCK_LEAD_RESULT: mockResult,
    TELEGRAM_BOT_TOKEN: "test-token",
    TELEGRAM_CHAT_ID: "test-chat",
    TURNSTILE_SITE_KEY: "",
    TURNSTILE_SECRET_KEY: "test-secret",
  };
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

async function waitForServer(previewUrl, timeoutMs = 30000) {
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

async function runPlaywrightPass(mockResult, args, portOffset) {
  let preview;
  const previewPort = String(basePreviewPort + portOffset);
  const previewUrl = `http://127.0.0.1:${previewPort}`;

  try {
    process.env.PLAYWRIGHT_BASE_URL = previewUrl;

    preview = spawn(
      npmCommand,
      ["run", "preview", "--", "--host", "127.0.0.1", "--port", previewPort],
      {
        env: {
          ...createE2eEnv(mockResult),
        },
        shell: isWindows,
        stdio: "inherit",
      },
    );

    await waitForServer(previewUrl);
    await run(playwrightCommand, [
      ...args,
      "--output",
      `test-results/${mockResult}`,
    ]);
  } finally {
    stopProcessTree(preview);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

let exitCode = 0;

try {
  await run(npmCommand, ["run", "build"], createE2eEnv());
  await runPlaywrightPass("success", ["test", "--grep-invert", "@mock-"], 0);
  await runPlaywrightPass("error", ["test", "--grep", "@mock-error"], 1);
  await runPlaywrightPass("timeout", ["test", "--grep", "@mock-timeout"], 2);
} catch (error) {
  console.error(error);
  exitCode = 1;
} finally {
  process.exit(exitCode);
}
