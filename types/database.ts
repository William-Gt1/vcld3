export type WaitlistSubmission = {
  id: number;
  name: string;
  email: string;
  subscribed_to_newsletter: boolean;
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

export type Database = {
  public: {
    Tables: {
      waitlist_submissions: {
        Row: WaitlistSubmission;
        Insert: Omit<WaitlistSubmission, 'id' | 'created_at'>;
        Update: Partial<Omit<WaitlistSubmission, 'id' | 'created_at'>>;
      };
    };
  };
}; 