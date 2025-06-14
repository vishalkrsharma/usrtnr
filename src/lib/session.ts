import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const getSession = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/auth/log-in');
  }

  return data.user;
};
