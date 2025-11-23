// Model / Domain type used dans le service si tu veux un découpage DTO ↔ Model
export interface ClientModel {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  photoUrl?: string;
  // Optionnel : nombre d'achats calculé côté service
  purchaseCount?: number;
}
