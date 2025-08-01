import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { COUNTRIES, WHATSAPP_GROUP_URL } from "@/lib/constants";
import { Rocket, Users, Star, Phone, Mail, User, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Contact {
  id: string;
  fullName: string;
  createdAt: string;
}

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { ThemeToggle } from "@/components/theme-toggle";
import { FAQSection } from "@/components/faq-section";
import { TopRecentContacts } from "@/components/top-recent-contacts";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { COUNTRIES, WHATSAPP_GROUP_URL } from "@/lib/constants";
import { Rocket, Users, Star, Phone, Mail, User, Clock, Zap, Target, Shield, Trophy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Contact {
  id: string;
  fullName: string;
  createdAt: string;
}

// Auto-detect country code based on user's location (simplified)
const detectCountryCode = (): string => {
  // This is a simplified version - in production, you'd use a geolocation API
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone.includes('Haiti') || timezone.includes('Port-au-Prince')) {
    return '+509';
  }
  return '+509'; // Default to Haiti
};

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: detectCountryCode(),
    whatsappNumber: "",
    email: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { toast } = useToast();

  // Auto-detect country code on component mount
  useEffect(() => {
    const detectedCountry = detectCountryCode();
    setFormData(prev => ({ ...prev, countryCode: detectedCountry }));
  }, []);

  // Fetch recent contacts
  const { data: recentContacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/contacts/recent"],
  });

  // Fetch contacts count
  const { data: contactsCount } = useQuery<{ count: number }>({
    queryKey: ["/api/contacts/count"],
  });

  // Registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccessModal(true);
      setFormData({
        fullName: "",
        countryCode: detectCountryCode(),
        whatsappNumber: "",
        email: "",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts/recent"] });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts/count"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de l'inscription",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.whatsappNumber.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const selectedCountry = COUNTRIES.find(c => c.code === formData.countryCode) || COUNTRIES[0];
    if (formData.whatsappNumber.length !== selectedCountry.digits) {
      toast({
        title: "Erreur",
        description: `Le numéro doit contenir exactement ${selectedCountry.digits} chiffres`,
        variant: "destructive",
      });
      return;
    }

    registerMutation.mutate(formData);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "À l'instant";
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    
    return `Il y a ${Math.floor(diffInHours / 24)} jour${Math.floor(diffInHours / 24) > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold gradient-ralph">
                RALPH HXP
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Heavy BLACK with red accents */}
        <section className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-black to-red-900/20 rounded-3xl"></div>
          <div className="relative max-w-4xl mx-auto py-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Boostez Votre</span>
              <br />
              <span className="gradient-ralph">Visibilité Professionnelle</span>
              <div className="flex justify-center mt-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center red-glow">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Rejoignez la communauté <span className="text-red-400 font-bold">Ralph Hxp</span> et transformez votre présence WhatsApp en véritable machine à succès !
            </p>
            
            {/* Statistics Cards - Heavy BLACK design */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="black-card-red-border red-glow">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">
                    {contactsCount?.count.toLocaleString() || "2,847"}
                  </div>
                  <div className="text-gray-300 font-medium">Membres Actifs</div>
                </CardContent>
              </Card>
              <Card className="black-card-red-border red-glow">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">99%</div>
                  <div className="text-gray-300 font-medium">Satisfaction</div>
                </CardContent>
              </Card>
              <Card className="black-card-red-border red-glow">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
                  <div className="text-gray-300 font-medium">Support Pro</div>
                </CardContent>
              </Card>
              <Card className="black-card-red-border red-glow">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">500%</div>
                  <div className="text-gray-300 font-medium">ROI Moyen</div>
                </CardContent>
              </Card>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-800">
                <Target className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Ciblage Précis</h3>
                <p className="text-gray-400">Atteignez votre audience idéale avec nos stratégies éprouvées</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-800">
                <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">100% Sécurisé</h3>
                <p className="text-gray-400">Vos données sont protégées par nos protocoles de sécurité avancés</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-800">
                <Trophy className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Résultats Garantis</h3>
                <p className="text-gray-400">Techniques testées par plus de 2800+ professionnels</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Registration Form Section - Professional BLACK design */}
          <section className="space-y-8">
            <Card className="black-card-red-border red-glow">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                  <User className="h-6 w-6 text-red-500" />
                  <span className="text-white">Inscription Professionnelle</span>
                </CardTitle>
                <p className="text-gray-400 mt-2">Rejoignez l'élite des professionnels WhatsApp</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white font-medium">
                      Nom Complet <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Votre nom professionnel"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="bg-black border-gray-600 text-white focus:border-red-500 focus:ring-red-500 placeholder-gray-500"
                      required
                    />
                  </div>

                  {/* WhatsApp Number Input */}
                  <div className="space-y-2">
                    <Label className="text-white font-medium">
                      Numéro WhatsApp <span className="text-red-500">*</span>
                    </Label>
                    <PhoneInput
                      countryCode={formData.countryCode}
                      phoneNumber={formData.whatsappNumber}
                      onCountryChange={(code) => setFormData(prev => ({ ...prev, countryCode: code }))}
                      onPhoneChange={(phone) => setFormData(prev => ({ ...prev, whatsappNumber: phone }))}
                    />
                    <div className="text-xs text-gray-400">
                      📍 Code pays détecté automatiquement
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">Email Professionnel (Recommandé)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre.email@entreprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-black border-gray-600 text-white focus:border-red-500 focus:ring-red-500 placeholder-gray-500"
                    />
                    <div className="text-xs text-gray-400">
                      ✅ Recevez les bonus exclusifs et mises à jour premium
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 red-glow"
                    disabled={registerMutation.isPending}
                  >
                    <Rocket className="h-5 w-5 mr-2" />
                    {registerMutation.isPending ? "Inscription en cours..." : "Rejoindre Ralph Hxp Maintenant"}
                  </Button>
                  
                  <div className="text-center text-xs text-gray-500">
                    🔒 Vos données sont sécurisées et ne seront jamais partagées
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Top 5 Recent Contacts */}
            <TopRecentContacts />
          </section>

          {/* Right Column */}
          <section className="space-y-8">
            {/* Testimonials */}
            <div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold flex items-center justify-center space-x-2">
                  <Star className="h-8 w-8 text-red-500" />
                  <span className="text-white">Témoignages Clients</span>
                </h2>
                <p className="text-gray-400 mt-2">Ce que disent nos membres premium</p>
              </div>
              <TestimonialsCarousel />
            </div>

            {/* Contact Section */}
            <Card className="black-card-red-border">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span className="text-white">Support Premium 24/7</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-black rounded-lg border border-gray-800 hover:border-red-500 transition-all">
                  <Mail className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-medium text-white">Email Support</div>
                    <a
                      href="mailto:contact.kerventzweb@gmail.com"
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      contact.kerventzweb@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-black rounded-lg border border-gray-800 hover:border-red-500 transition-all">
                  <Phone className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-medium text-white">Hotline VIP</div>
                    <a
                      href="tel:+18495849472"
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      +1 (849) 584-9472
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-400">
              Tout ce que vous devez savoir sur Ralph Hxp
            </p>
          </div>
          <FAQSection />
        </section>
      </main>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md bg-black border-red-500">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 red-glow">
                <Rocket className="h-10 w-10 text-white" />
              </div>
              <span className="text-white">Bienvenue chez Ralph Hxp ! 🎉</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-gray-300 leading-relaxed">
              <span className="text-red-400 font-bold">FÉLICITATIONS !</span> Votre inscription est réussie avec succès. 
              Rejoignez maintenant le groupe WhatsApp exclusif pour accéder au fichier VCF premium et booster votre visibilité professionnelle !
            </p>
            <Button
              asChild
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 red-glow"
            >
              <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                </svg>
                Accéder au Groupe VIP
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer - Heavy BLACK with new credit */}
      <footer className="bg-black border-t border-gray-800 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl font-bold gradient-ralph">RALPH HXP</div>
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                La plateforme professionnelle #1 pour booster votre visibilité WhatsApp et développer votre réseau d'affaires avec des stratégies éprouvées.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Liens Utiles</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-red-400 transition-colors">À propos de Ralph Hxp</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Services Premium</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Support 24/7</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Confidentialité</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              <span className="text-red-400">The site was created by Ralph And Assist by Andy Mrlit. 2025</span>
            </p>
            <p className="text-gray-500 mt-2">© 2025 Ralph Hxp. Tous droits réservés. Plateforme professionnelle de visibilité WhatsApp.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
