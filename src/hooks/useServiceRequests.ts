
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useEffect } from 'react';

export interface ServiceRequest {
  id: string;
  customer_id: string;
  service_id: string | null;
  title: string;
  description: string;
  location: string;
  budget_range: string | null;
  preferred_date: string | null;
  time_preference: string | null;
  urgency: 'flexible' | 'within-week' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string;
    phone: string | null;
    email: string;
  };
}

export const useServiceRequests = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('service-requests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'service_requests'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['serviceRequests'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  return useQuery({
    queryKey: ['serviceRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          profiles!service_requests_customer_id_fkey (
            full_name,
            phone,
            email
          )
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ServiceRequest[];
    },
  });
};

export const useCreateServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestData: {
      title: string;
      description: string;
      location: string;
      budget_range?: string;
      preferred_date?: string;
      time_preference?: string;
      urgency: 'flexible' | 'within-week' | 'urgent';
    }) => {
      const { data, error } = await supabase
        .from('service_requests')
        .insert({
          ...requestData,
          customer_id: (await supabase.auth.getUser()).data.user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['serviceRequests'] });
    },
  });
};
