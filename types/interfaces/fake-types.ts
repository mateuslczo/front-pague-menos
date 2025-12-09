
export interface Product {
  id: number;
  name: string;
}

export const fakeProduct: Product[] = [
  { id: 1, name: "Xarope Vick"  },
  { id: 2, name: "Pastilha Valda" },
  { id: 3, name: "Enalapril" },
  { id: 4, name: "Estomazil" },
];

export interface Collaborator {
  id: number;
  name: string;
  department: string;
}

export const fakeCollaborators: Collaborator[] = [
  { id: 1, name: "Ana Silva", department: "TI" },
  { id: 2, name: "Carlos Santos", department: "Vendas" },
  { id: 3, name: "Mariana Oliveira", department: "RH" },
  { id: 4, name: "João Pereira", department: "Financeiro" },
  { id: 5, name: "Juliana Costa", department: "Marketing" },
  { id: 6, name: "Ricardo Almeida", department: "Operações" },
  { id: 7, name: "Fernanda Lima", department: "TI" },
  { id: 8, name: "Roberto Souza", department: "Vendas" },
  { id: 9, name: "Patrícia Rocha", department: "RH" },
  { id: 10, name: "Lucas Mendes", department: "Financeiro" }
];