export interface GodownDetails{
  id: number;
  name: string;
  description:string;
  capacity:number;
  storage:number;
  currentStock: number;
  inwardStock: number;
  outwardStock: number;
  lastUpdated?: string;
  status: 'active' | 'inactive';
  location?: string;
  contactPerson?: string;
  contactNumber?: string;
}
