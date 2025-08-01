import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest("POST", "/api/admin/login", { password });
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("adminSession", data.sessionId);
      localStorage.setItem("sessionExpiry", data.expiresAt);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'administration Ralph Hxp",
      });
      setLocation("/admin");
    },
    onError: (error: any) => {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Mot de passe incorrect",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir le mot de passe",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(password);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md px-4">
        <Card className="black-card-red-border red-glow">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-red-500" />
              <CardTitle className="text-2xl font-bold gradient-ralph">
                RALPH HXP 🔥
              </CardTitle>
            </div>
            <div className="text-lg font-semibold text-gray-400">
              Administration
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2 text-white">
                  <Lock className="h-4 w-4 text-red-500" />
                  <span>Mot de passe</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez le mot de passe admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black border-gray-600 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold red-glow"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => setLocation("/")}
                className="text-gray-400 hover:text-red-400"
              >
                ← Retour au site Ralph Hxp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
