export const whatsappService = {
  buildDueReminder(input: { name: string; amount: string; chit: string; date: string; foreman: string }) {
    return `Dear ${input.name}, instalment ${input.amount} for ${input.chit} is due on ${input.date}. Please pay. - ${input.foreman}`;
  },
};
