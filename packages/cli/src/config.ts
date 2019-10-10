import Conf from "conf";
import { ClipboardWatcher } from "./clipboard";
import { openPrompt, prompt } from "./prompts";

interface Config {
  apiKey: string;
}

const _config = new Conf<Config>();

// TODO: Add more explicit config management
if (process.env.CLEAR_LINEAR_CONFIG) {
  _config.clear();
}

export const getApiKey = () => process.env.LINEAR_API_KEY || _config.get("apiKey");

export const verifyApiKey = async () => {
  const key = getApiKey();
  if (key) {
    return key;
  }

  const { openLinear } = await prompt<{ openLinear: boolean }>({
    type: "toggle",
    name: "openLinear",
    message: "The linear api key is missing. What would you like to do?",
    enabled: "Create one",
    disabled: "Quit",
  });

  if (openLinear) {
    await openPrompt("https://linear.app/settings/api", true);
    const clipboard = new ClipboardWatcher();
    console.log("Waiting for you to copy the api key...");
    const apiKey = await clipboard.watch(/^\w{40}$/);
    if (!apiKey) {
      console.error("Something went wrong, the api key couldn't be retrieved");
      process.exit(1);
      return;
    }
    _config.set("apiKey", apiKey);
    await clipboard.clear();
  } else {
    process.exit(0);
  }
};
