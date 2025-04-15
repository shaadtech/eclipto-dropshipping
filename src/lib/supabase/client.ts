import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wvxbfbeshsgcshjfzrju.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2eGJmYmVzaHNnY3NoamZ6cmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NzM3OTEsImV4cCI6MjA1NDM0OTc5MX0.qAycbyHdsb4eDx4BFEv-VIizeu4tssoAApoxNGLZluA'

export const supabase = createClient(supabaseUrl, supabaseKey)
