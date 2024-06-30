import app from "@application";
import "@components/accordion";
import { keyboardController } from "@utils/keyboardController";

keyboardController({
  Delete: () => app.clearGameStats(),
});
