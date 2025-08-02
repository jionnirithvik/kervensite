import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const FAQ_DATA = [
  {
    question: "Qu'est-ce que Ralph Hxp ?",
    answer: "Ralph Hxp est une plateforme professionnelle qui vous aide à booster votre visibilité sur WhatsApp. Nous offrons des outils et services pour optimiser votre présence digitale et développer votre réseau professionnel."
  },
  {
    question: "Comment fonctionne l'inscription ?",
    answer: "L'inscription est simple et gratuite. Il suffit de remplir le formulaire avec votre nom complet et votre numéro WhatsApp. Vous recevrez ensuite un accès au groupe WhatsApp exclusif et pourrez télécharger le fichier VCF pour booster votre visibilité."
  },
  {
    question: "Le service est-il vraiment gratuit ?",
    answer: "Oui, l'inscription de base est entièrement gratuite. Vous avez accès au groupe WhatsApp, au fichier VCF, et aux conseils de base pour améliorer votre visibilité. Des services premium sont disponibles pour ceux qui souhaitent aller plus loin."
  },
  {
    question: "Combien de temps faut-il pour voir des résultats ?",
    answer: "La plupart de nos membres constatent une amélioration de leur visibilité dans les 2 premières semaines. Les résultats dépendent de votre engagement et de l'application des stratégies partagées dans notre communauté."
  },
  {
    question: "Puis-je utiliser Ralph Hxp pour mon entreprise ?",
    answer: "Absolument ! Ralph Hxp est parfait pour les entrepreneurs, freelances, et entreprises qui souhaitent développer leur présence sur WhatsApp. Nous avons des solutions adaptées à tous les types d'activités professionnelles."
  },
  {
    question: "Comment contacter le support ?",
    answer: "Notre équipe de support est disponible 24/7. Vous pouvez nous contacter par email à contact.kerventzweb@gmail.com ou par téléphone au +1 (849) 584-9472. Nous répondons généralement dans les 2 heures."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "La sécurité de vos données est notre priorité absolue. Nous utilisons des protocoles de chiffrement avancés et ne partageons jamais vos informations personnelles avec des tiers. Votre vie privée est respectée."
  },
  {
    question: "Puis-je me désinscrire à tout moment ?",
    answer: "Oui, vous pouvez vous désinscrire à tout moment en nous contactant. Nous respectons votre choix et supprimerons toutes vos données de nos systèmes dans les 48 heures suivant votre demande."
  }
];

export function FAQSection() {
  return (
    <Card className="black-card-red-border">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center space-x-2">
          <HelpCircle className="h-6 w-6 text-red-500" />
          <span className="text-white">Questions Fréquentes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_DATA.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-gray-800"
            >
              <AccordionTrigger className="text-left text-white hover:text-red-400 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}