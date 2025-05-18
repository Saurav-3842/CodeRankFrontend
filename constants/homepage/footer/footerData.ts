// components/footerData.ts

export interface LinkItem {
  label: string;
  href: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href?: string;
}

export const socialLinks: LinkItem[] = [
  { label: "Youtube", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Linkedin", href: "#" },
  { label: "Facebook", href: "#" },
];

export const quickLinks: LinkItem[] = [
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export const contactInfo: ContactItem[] = [
  {
    label: "Email",
    value: "support@techsphere.org",
    href: "mailto:support@techsphere.org",
  },
  {
    label: "Phone",
    value: "+1 (800) 123-4567",
    href: "tel:+18001234567",
  },
  {
    label: "Address",
    value: "123 Square Avenue, City, Country",
  },
];
