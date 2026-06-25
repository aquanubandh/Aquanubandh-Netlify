import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/templates/index.html");
  const htmlContent = fs.readFileSync(filePath, "utf8");
  return new Response(htmlContent, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
