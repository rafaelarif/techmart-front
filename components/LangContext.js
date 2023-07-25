import {createContext, useState, useContext} from 'react';

const LangContext = createContext();

export const LangProvider = ({children}) => {
    const [lang, setLang] = useState('EN');
    const translations = {
        'EN': {
            home: 'Home',
            products: 'All Products',
            categories: 'Categories',
            faq: 'FAQ',
            cart: 'Cart',
            copyright: '&copy; 2023 TechMart. All rights reserved.',
            faqTitle: 'Frequently Asked Questions',
            faqData: [
                {
                    question: 'What is TechMart?',
                    answer: 'TechMart is an ecommerce website specializing in a wide range of electronics. We carry products from many of the leading global technology brands.'
                },
                {
                    question: 'What payment methods does TechMart accept?',
                    answer: 'We accept all major credit and debit cards including Visa, Mastercard and American Express.'
                },
                {
                    question: 'How long will it take for my order to arrive?',
                    answer: 'Delivery time depends on your location and the shipping method you have chosen. However, most orders within the continental U.S. will arrive within 5-7 business days. For more accurate estimates, please refer to the shipping information provided at checkout.'
                },
                {
                    question: 'Can I return or exchange a product I purchased?',
                    answer: 'Yes, we have a 30-day return policy for most items sold on TechMart, provided they are returned in their original condition and packaging. Some exclusions may apply, such as for clearance or open-box items.'
                },
                {
                    question: 'What if my product is damaged or defective?',
                    answer: 'If you receive a damaged or defective item, please contact our customer service team immediately. We will arrange for a return or exchange, and we will work to resolve the issue as quickly as possible.'
                },
                {
                    question: 'How secure is my personal information on TechMart?',
                    answer: 'TechMart takes customer privacy and security very seriously. We use industry-standard encryption methods to protect your personal information. We will never sell or distribute your personal information to third parties without your explicit consent.'
                },
                {
                    question: 'How can I contact TechMart if I have more questions?',
                    answer: 'If you have any questions or need further assistance, you can reach out to our customer service team via our email at support@techmart.com. Our aim is to respond to all queries within 24 hours.'
                }
            ]
        },
        'FR': {
            home: 'Accueil',
            products: 'Tous les produits',
            categories: 'Catégories',
            faq: 'FAQ',
            cart: 'Panier',
            copyright: '&copy; 2023 TechMart. Tous droits réservés.',
            faqTitle: 'Questions fréquemment posées',
            faqData: [
                {
                    question: 'Qu\'est-ce que TechMart?',
                    answer: 'TechMart est un site de commerce électronique spécialisé dans une large gamme d\'électroniques. Nous proposons des produits de nombreuses grandes marques technologiques mondiales.'
                },
                {
                    question: 'Quels modes de paiement TechMart accepte-t-il?',
                    answer: 'Nous acceptons toutes les principales cartes de crédit et de débit, y compris Visa, Mastercard et American Express.'
                },
                {
                    question: 'Combien de temps faut-il pour que ma commande arrive?',
                    answer: 'Le délai de livraison dépend de votre emplacement et du mode de livraison que vous avez choisi. Cependant, la plupart des commandes aux États-Unis continentaux arriveront dans un délai de 5 à 7 jours ouvrables. Pour des estimations plus précises, veuillez vous référer aux informations d\'expédition fournies lors de la validation de la commande.'
                },
                {
                    question: 'Puis-je retourner ou échanger un produit que j\'ai acheté?',
                    answer: 'Oui, nous avons une politique de retour de 30 jours pour la plupart des articles vendus sur TechMart, à condition qu\'ils soient retournés dans leur état et leur emballage d\'origine. Certaines exclusions peuvent s\'appliquer, comme pour les articles en liquidation ou les articles ouverts.'
                },
                {
                    question: 'Que se passe-t-il si mon produit est endommagé ou défectueux?',
                    answer: 'Si vous recevez un article endommagé ou défectueux, veuillez contacter notre équipe du service clientèle immédiatement. Nous organiserons un retour ou un échange, et nous travaillerons pour résoudre le problème le plus rapidement possible.'
                },
                {
                    question: 'Mes informations personnelles sont-elles sécurisées sur TechMart?',
                    answer: 'TechMart prend très au sérieux la confidentialité et la sécurité de ses clients. Nous utilisons des méthodes de cryptage standard de l\'industrie pour protéger vos informations personnelles. Nous ne vendrons jamais ni ne distribuerons vos informations personnelles à des tiers sans votre consentement explicite.'
                },
                {
                    question: 'Comment puis-je contacter TechMart si j\'ai d\'autres questions?',
                    answer: 'Si vous avez des questions ou besoin d\'aide supplémentaire, vous pouvez contacter notre équipe du service clientèle via notre email à support@techmart.com. Notre objectif est de répondre à toutes les demandes dans les 24 heures.'
                }
            ]
        }
    }

    return (
        <LangContext.Provider value={{lang, setLang, translations}}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => useContext(LangContext);