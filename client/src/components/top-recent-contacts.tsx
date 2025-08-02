import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, TrendingUp } from "lucide-react";

interface Contact {
  id: string;
  fullName: string;
  createdAt: string;
}

export function TopRecentContacts() {
  // Fetch recent contacts
  const { data: recentContacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/contacts/recent"],
    refetchInterval: 30000, // Refresh every 30 seconds for real-time updates
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "À l'instant";
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
  };

  return (
    <Card className="black-card-red-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-red-500" />
          <span className="text-white">Top 5 Derniers Inscrits</span>
          <div className="ml-auto">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentContacts.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-600" />
              <p>Aucune inscription récente</p>
              <p className="text-sm">Soyez le premier à rejoindre Ralph Hxp !</p>
            </div>
          ) : (
            recentContacts.slice(0, 5).map((contact, index) => (
              <div 
                key={contact.id} 
                className="flex items-center space-x-3 p-4 bg-black rounded-lg border border-gray-800 hover:border-red-500 transition-all duration-300 red-glow"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {contact.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">
                    {contact.fullName}
                    <span className="ml-2 text-red-400 text-sm">✨ RALPH HXP</span>
                  </div>
                  <div className="text-sm text-gray-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeAgo(contact.createdAt)}
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            ))
          )}
        </div>
        
        {/* Real-time indicator */}
        <div className="mt-4 pt-3 border-t border-gray-800">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Mis à jour en temps réel</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}