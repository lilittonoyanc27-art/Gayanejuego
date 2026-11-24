import type { Bi } from '../core/bi';
export interface Npc { name: string; role: Bi; male?: boolean; skin: string; hair: string; top: string; bottom: string; style: 'largo' | 'corto' | 'coleta' | 'mono'; beard?: boolean; teen?: boolean; apron?: string }
export const NPCS: Record<string, Npc> = {
  gayane: { name: 'Gayane', role: 'La protagonista|Գլխավոր հերոսուհին', skin: '#e6b594', hair: '#3b241a', top: '#e7a9c2', bottom: '#6f86b3', style: 'largo', teen: true },
  lucia: { name: 'Lucía', role: 'Encargada de la tienda|Խանութի կառավարիչ', skin: '#dca684', hair: '#4a2a18', top: '#f5ecec', bottom: '#4b4a63', style: 'coleta', apron: '#c48ab4' },
  marcos: { name: 'Marcos', role: 'Especialista en perros|Շների մասնագետ', male: true, skin: '#c98f6b', hair: '#1f1612', top: '#dfe7ea', bottom: '#3d4257', style: 'corto', beard: true, apron: '#9d86c4' },
  elena: { name: 'Elena', role: 'Especialista en gatos|Կատուների մասնագետ', skin: '#f0cbb2', hair: '#a8603a', top: '#f4e6dc', bottom: '#6b5a66', style: 'mono', apron: '#d793ab' },
  diego: { name: 'Diego', role: 'Especialista en acuarios|Ակվարիումների մասնագետ', male: true, skin: '#e0b08d', hair: '#6d4a2c', top: '#d7e5ec', bottom: '#384a5e', style: 'corto', apron: '#7fa6bf' },
  ines: { name: 'Inés', role: 'Especialista en aves y roedores|Թռչունների և կրծողների մասնագետ', skin: '#8d5a3c', hair: '#17100d', top: '#f3e4ee', bottom: '#57476b', style: 'coleta', apron: '#b59ad6' },
  carmen: { name: 'Carmen', role: 'Cajera|Գանձապահ', skin: '#e6b797', hair: '#2a1c18', top: '#f7e1e8', bottom: '#4c4558', style: 'mono', apron: '#d8a3b5' },
  vet: { name: 'Doctora Vega', role: 'Veterinaria|Անասնաբույժ', skin: '#dba780', hair: '#33221b', top: '#e8f1f0', bottom: '#7b94a8', style: 'mono', apron: '#f7fbfb' },
  pablo: { name: 'Pablo', role: 'Recepcionista|Ընդունարանի աշխատակից', male: true, skin: '#efc6a7', hair: '#7a5534', top: '#cfe0e6', bottom: '#4a5568', style: 'corto' },
  sofia: { name: 'Sofía', role: 'Amiga de Gayane|Գայանեի ընկերուհին', skin: '#f1cfb8', hair: '#c79a5b', top: '#cbb7e6', bottom: '#8b93b8', style: 'largo', teen: true },
  hugo: { name: 'Hugo', role: 'Nuevo empleado|Նոր աշխատակից', male: true, skin: '#d19d78', hair: '#2d211b', top: '#e8dcc9', bottom: '#4d5568', style: 'corto', apron: '#b79bd0' },
  rosa: { name: 'Doña Rosa', role: 'Clienta|Հաճախորդ', skin: '#e5bda4', hair: '#b9b2ad', top: '#b98aa8', bottom: '#5b4b58', style: 'mono' },
  emma: { name: 'Emma', role: 'Turista|Զբոսաշրջիկ', skin: '#f5d8c6', hair: '#d8b06a', top: '#f0c9a8', bottom: '#8397a8', style: 'coleta' },
  andres: { name: 'Andrés', role: 'Cliente|Հաճախորդ', male: true, skin: '#c58a64', hair: '#1c1512', top: '#8d9cc0', bottom: '#3a3f52', style: 'corto', beard: true },
};
export const CUSTOMERS = ['rosa', 'andres', 'sofia', 'emma', 'hugo', 'pablo'];
