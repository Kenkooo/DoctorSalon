
import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
import TicketManagement from './pages/TicketManagement';
import ApplicationManagement from './pages/ApplicationManagement';
import NewApplication from './pages/NewApplication';
import SubscriptionManagement from './pages/SubscriptionManagement';
import InvoiceManagement from './pages/InvoiceManagement';
import ShippingManagement from './pages/ShippingManagement';
import Login from './pages/Login';
import IngredientManagement from './pages/IngredientManagement';
import PartnerManagement from './pages/PartnerManagement';
import ManufacturerSalesManagement from './pages/ManufacturerSalesManagement';
import ClinicPurchaseManagement from './pages/ClinicPurchaseManagement';
import DealerPurchaseManagement from './pages/DealerPurchaseManagement';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

const Main: React.FC = () => {
    const { user } = useApp();

    if (!user) {
        return <Login />;
    }

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="ingredients" element={<IngredientManagement />} />
                    <Route path="partners" element={<PartnerManagement />} />
                    <Route path="tickets" element={<TicketManagement />} />
                    <Route path="applications" element={<ApplicationManagement />} />
                    <Route path="applications/new" element={<NewApplication />} />
                    <Route path="shipping" element={<ShippingManagement />} />
                    <Route path="subscriptions" element={<SubscriptionManagement />} />
                    <Route path="invoices" element={<InvoiceManagement />} />

                    {/* Order Management Routes */}
                    <Route path="manufacturer-sales" element={<ManufacturerSalesManagement />} />
                    <Route path="clinic-purchases" element={<ClinicPurchaseManagement />} />
                    <Route path="dealer-purchases" element={<DealerPurchaseManagement />} />

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;