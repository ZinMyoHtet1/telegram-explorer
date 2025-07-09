function validateUrl(telegramLink) {
  return new Promise((resolve, reject) => {
    try {
      let validTelegram = telegramLink.trim();
      if (
        validTelegram.startsWith("https://t.me/") ||
        validTelegram.startsWith("t.me/")
      ) {
        validTelegram = validTelegram.replace("https://", "");
        if (!validTelegram.startsWith("t.me/s")) {
          validTelegram = validTelegram.replace("t.me", "t.me/s");

          const array = validTelegram.split("/");
          const lastPart = array.at(-1);
          if (!isNaN(Number(lastPart))) {
            array.pop();
            validTelegram = array.join("/");
          }
        }
        validTelegram = "https://" + validTelegram;
        resolve(validTelegram);
      }
      throw new Error("Invalid URL: " + validTelegram);
    } catch (error) {
      reject(error);
    }
  });
}

export default validateUrl;
