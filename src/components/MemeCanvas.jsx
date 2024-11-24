import { useRef } from "react";

export default function MemeCanvas({ meme }) {
  const canvasRef = useRef(null);

  function downloadMeme() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = meme.RandomImg;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const borderWidth = 10;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the image within the border
      ctx.drawImage(
        img,
        borderWidth,
        borderWidth,
        canvas.width - 2 * borderWidth,
        canvas.height - 2 * borderWidth
      );
      // function for to wrap text on canvas
      function wrapText(text, x, y, Maxwidth, lineHeight) {
        const words = text.split(" ");
        let lines = [];
        let currentLine = "";

        for (const word of words) {
          const testLine = currentLine + word + " ";
          const textWidth = ctx.measureText(testLine).width;

          if (textWidth > Maxwidth) {
            lines.push(currentLine);
            currentLine = word + " ";
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);

        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], x, y + i * lineHeight);
        }
      }

      // Set text style

      const fontSize = Math.floor(canvas.width / 20);
      ctx.font = `bold ${fontSize}px impact`;
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = Math.floor(fontSize / 10);


      let topText = meme.Top_Text.toUpperCase();
      let BottomText = meme.Bottom_Text.toUpperCase();
      const maxWidth = canvas.width - 20;
      const lineHeight = 30;
      const x = canvas.width / 2;
      const topTextY = 80;
      const bottomTextY = canvas.height - 30;

      //Top text

      wrapText(topText, x, topTextY, maxWidth, lineHeight);

      //Bottom Text

      wrapText(BottomText, x, bottomTextY, maxWidth, lineHeight);

        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };
  }

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "nonegi" }}></canvas>
      <button onClick={downloadMeme} className="Form_button gradient download">
        Download Meme
      </button>
    </>
  );
}
