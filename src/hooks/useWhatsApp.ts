import { whatsappService } from '@/services/whatsapp.service';

export function useWhatsApp() {
  return {
    buildDueReminder: whatsappService.buildDueReminder,
  };
}
