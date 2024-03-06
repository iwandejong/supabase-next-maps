import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hybyrlxxquitkiwsghon.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YnlybHh4cXVpdGtpd3NnaG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTAxODIsImV4cCI6MjAyNTIyNjE4Mn0.yjJ_1L2sRejOy-qWazp8rwtyqGKkpUhg3pIhGwZ_t90';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
