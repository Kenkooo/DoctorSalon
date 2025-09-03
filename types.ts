
export enum Role {
  CLINIC = 'clinic',
  MANUFACTURER = 'manufacturer',
  DEALER = 'dealer',
  SALON = 'salon'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  dealerId?: string; // for salons
  contactPerson?: string; // for dealers
  phone?: string; // for dealers
}

export interface Ingredient {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredientIds: string[];
}

export interface TicketBalance {
  id: string;
  salonId: string;
  productId: string;
  balance: number;
}

export enum TicketRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface TicketRequest {
  id: string;
  salonId: string;
  dealerId: string;
  productId: string;
  quantity: number;
  status: TicketRequestStatus;
  requestDate: string;
}

export enum ApplicationStatus {
  PENDING = 'pending',
  DISPATCHED = 'dispatched'
}

export interface Application {
  id: string;
  salonId: string;
  endUserName: string;
  endUserAddress: string;
  endUserPhone: string;
  productId: string;
  requestDate: string;
  dispatchDate?: string;
  status: ApplicationStatus;
  sourceSubscriptionId?: string; 
}

export enum SubscriptionStatus {
    ACTIVE = 'active',
    PAUSED = 'paused',
    STOPPED = 'stopped'
}

export enum SubscriptionEventType {
    STARTED = 'started',
    SKIPPED = 'skipped',
    PAUSED = 'paused',
    RESUMED = 'resumed',
    STOPPED = 'stopped',
}

export interface SubscriptionEvent {
    type: SubscriptionEventType;
    date: string;
}

export interface Subscription {
  id: string;
  applicationId: string;
  endUserName: string;
  nextDeliveryDate: string;
  status: SubscriptionStatus;
  startDate: string;
  history: SubscriptionEvent[];
}

export interface Invoice {
  id: string;
  fromId: string; // manufacturerId or dealerId
  toId: string;   // dealerId or salonId
  amount: number;
  issueDate: string;
  dueDate: string;
  paid: boolean;
}

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped'
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number; // Price per item at the time of order
}

export interface Order {
    id: string;
    ordererId: string; // clinicId or dealerId
    ordererName: string;
    ordererRole: Role;
    items: OrderItem[];
    totalAmount: number;
    orderDate: string;
    status: OrderStatus;
}


// --- Translation Helpers ---

export const getRoleName = (role: Role): string => {
  switch (role) {
    case Role.CLINIC: return 'クリニック';
    case Role.MANUFACTURER: return 'メーカー';
    case Role.DEALER: return 'ディーラー';
    case Role.SALON: return 'サロン';
    default: return role;
  }
};

export const getTicketRequestStatusName = (status: TicketRequestStatus): string => {
    switch(status) {
        case TicketRequestStatus.PENDING: return '承認待ち';
        case TicketRequestStatus.APPROVED: return '承認済み';
        case TicketRequestStatus.REJECTED: return '否決';
        default: return status;
    }
}

export const getApplicationStatusName = (status: ApplicationStatus): string => {
    switch(status) {
        case ApplicationStatus.PENDING: return '発送待ち';
        case ApplicationStatus.DISPATCHED: return '発送済み';
        default: return status;
    }
}

export const getSubscriptionStatusName = (status: SubscriptionStatus): string => {
    switch(status) {
        case SubscriptionStatus.ACTIVE: return '現在契約中';
        case SubscriptionStatus.PAUSED: return '一時停止中';
        case SubscriptionStatus.STOPPED: return '終了済み';
        default: return status;
    }
}

export const getSubscriptionEventTypeName = (type: SubscriptionEventType): string => {
    switch (type) {
        case SubscriptionEventType.STARTED: return '契約開始';
        case SubscriptionEventType.SKIPPED: return 'スキップ';
        case SubscriptionEventType.PAUSED: return '一時停止';
        case SubscriptionEventType.RESUMED: return '再開';
        case SubscriptionEventType.STOPPED: return '停止';
        default: return type;
    }
};

export const getOrderStatusName = (status: OrderStatus): string => {
    switch (status) {
        case OrderStatus.PENDING: return '受付';
        case OrderStatus.PROCESSING: return '処理中';
        case OrderStatus.SHIPPED: return '発送済み';
        default: return status;
    }
};
