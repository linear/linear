import clipboard from "clipboardy";

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// This isn't perfect, but it can be improved
// if we intend to watch in multiple places
export class ClipboardWatcher {
  public async watch(pattern: RegExp) {
    this.watching = true;

    let buffer = await clipboard.read();
    while (this.watching) {
      if (buffer.match(pattern)) {
        return buffer;
      }
      await sleep(500);
      buffer = await clipboard.read();
    }
  }

  public isWatching() {
    return this.watching;
  }

  public stopWatching() {
    this.watching = false;
  }

  public async clear() {
    clipboard.write("");
  }

  private watching = false;
}
