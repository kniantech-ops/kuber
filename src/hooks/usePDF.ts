import { pdfService } from '@/services/pdf.service';

export function usePDF() {
  return {
    generateReceiptHtml: pdfService.generateReceiptHtml,
  };
}
