export const pdfService = {
  async generateReceiptHtml(input: {
    memberName: string;
    chitName: string;
    amountLabel: string;
    receiptNumber: string;
  }): Promise<string> {
    return `
      <html>
        <body style="font-family: sans-serif; padding: 24px;">
          <h1>Kuber Receipt</h1>
          <p>Receipt No: ${input.receiptNumber}</p>
          <p>Member: ${input.memberName}</p>
          <p>Chit: ${input.chitName}</p>
          <p>Amount: ${input.amountLabel}</p>
          <p>Secured by Kuber</p>
        </body>
      </html>
    `;
  },
};
