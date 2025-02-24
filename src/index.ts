import { TypeGenerator } from "./generator";
import { normalizeData } from "./utils/normalizeData";

interface CreateTypedFetchOptions {
  interfaceName: string;
  data: any;
  outputPath: string;
}

export async function createTypedFetch(options: CreateTypedFetchOptions) {
  const generator = new TypeGenerator();
  const normalizedData = normalizeData(options.data);
  const interfaces = generator.generate(normalizedData, options.interfaceName);

  if (typeof process !== "undefined" && process.versions?.node) {
    // Node.js environment
    const fs = require("fs");
    const path = require("path");

    const fullPath = path.resolve(options.outputPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, interfaces);
    return { success: true, path: fullPath };
  }

  // Browser environment
  if (typeof window !== "undefined") {
    try {
      const blob = new Blob([interfaces], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = options.outputPath.split("/").pop() || "types.ts";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  throw new Error("Unsupported environment");
}
