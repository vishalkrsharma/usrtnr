'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const getSession = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    clearSession();
    redirect('/auth/log-in');
  }

  return data.user;
};

export const checkSession = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return data.user;
};

export const clearSession = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/auth/log-in');
};
