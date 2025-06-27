
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface ProviderApplication {
  id: string;
  provider_id: string;
  business_name: string;
  business_description: string;
  experience_years: number;
  certifications: string[];
  portfolio_urls: string[];
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_by?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  profiles: {
    full_name: string;
    email: string;
    phone?: string;
    location?: string;
  };
}

export const useProviderApplications = () => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('provider-applications-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'provider_applications'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['provider-applications'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['provider-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_applications')
        .select(`
          *,
          profiles!provider_applications_provider_id_fkey (
            full_name,
            email,
            phone,
            location
          )
        `)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return data as ProviderApplication[];
    },
  });

  const approveApplication = useMutation({
    mutationFn: async (applicationId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('provider_applications')
        .update({
          status: 'approved',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;

      // Log the action
      await supabase.rpc('log_admin_action', {
        p_admin_id: user.id,
        p_action: 'approve_application',
        p_target_type: 'provider_application',
        p_target_id: applicationId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-applications'] });
    },
  });

  const rejectApplication = useMutation({
    mutationFn: async ({ applicationId, reason }: { applicationId: string; reason: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('provider_applications')
        .update({
          status: 'rejected',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          rejection_reason: reason
        })
        .eq('id', applicationId);

      if (error) throw error;

      // Log the action
      await supabase.rpc('log_admin_action', {
        p_admin_id: user.id,
        p_action: 'reject_application',
        p_target_type: 'provider_application',
        p_target_id: applicationId,
        p_details: JSON.stringify({ reason })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-applications'] });
    },
  });

  return {
    applications,
    isLoading,
    approveApplication,
    rejectApplication,
  };
};
