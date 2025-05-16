
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

interface ProfileData {
  name?: string;
  customerType?: 'student' | 'teacher' | 'other';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profileData: ProfileData) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Auth provider mounted");
    
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state changed:", event);
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false); // Set loading to false on auth state change
    });

    // Then check for existing session
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Current session:", currentSession ? "exists" : "none");
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Success toast
      toast.success("Signed in successfully");
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
      console.error("Error signing in:", error);
      setLoading(false); // Set loading to false on error
    }
    // Don't set loading to false here, it will be set by the auth state change event
  };

  const signUp = async (email: string, password: string, profileData: ProfileData) => {
    try {
      setLoading(true);
      // Sign up the user with metadata
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name: profileData.name,
            customer_type: profileData.customerType
          }
        } 
      });
      
      if (error) throw error;
      
      toast.success("Sign up successful! Please check your email to verify your account.");
    } catch (error: any) {
      toast.error(error.message || "Error signing up");
      console.error("Error signing up:", error);
      setLoading(false); // Set loading to false on error
    }
    // Don't set loading to false here, it will be set by the auth state change event
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
