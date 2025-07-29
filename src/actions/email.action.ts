'use server';

import { TResponse } from '@/types/global';
import { CreateEmailResponseSuccess, Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailAction = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}): Promise<
  TResponse<{
    data: CreateEmailResponseSuccess;
    error: Error | null;
  }>
> => {
  try {
    const response = await resend.emails.send({
      from: 'usrtnr <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: html || `<p>${text}</p>`,
      text: text,
    });

    if (response.error) {
      throw response.error;
    }

    return {
      success: true,
      data: { data: response.data!, error: null },
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error in sendEmailAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('An unknown error occurred'),
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
