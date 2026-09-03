// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './Logistics_Data/Main_Menu/Orders';
import Warehouse from './Logistics_Data/Main_Menu/Warehouse';
import Dashboard from './Logistics_Data/Main_Menu/Dashboard';
import AppLayout from './AppLayout';
import Shipments from './Logistics_Data/Main_Menu/Shipments';
import Clients from './Logistics_Data/Main_Menu/Clients';
import Vehicles from './Logistics_Data/Main_Menu/Vehicles';
import GatePass from './Logistics_Data/Management/GatePass';
import Compliance from './Logistics_Data/Management/Compliance';
import Settings from './Logistics_Data/Management/Settings';
import Administration from './Logistics_Data/Management/Administration';
import OrderOverview from './Logistics_Data/OrderManagement/OrderOverview';
import LoadingReceipts from './Logistics_Data/OrderManagement/LoadingReceipts';
import ConsignmentTracking from './Logistics_Data/OrderManagement/ConsignmentTracking';
import RoutePlanning from './Logistics_Data/OrderManagement/RoutePlanning';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path='shipments' element={<Shipments />} />
          <Route path='clients' element={<Clients />} />
          <Route path='vehicles' element={<Vehicles />} />
          <Route path='gate-pass' element={<GatePass />} />
          <Route path='administration' element={<Administration />} />
          <Route path='compliance' element={<Compliance />}></Route>
          <Route path='settings' element={<Settings />}></Route>
          <Route path='order-overview' element={<OrderOverview/>}></Route>
          <Route path='loading-receipts' element={<LoadingReceipts />}></Route>
          <Route path='consignment-tracking' element={<ConsignmentTracking />}></Route>
          <Route path='route-planning' element={<RoutePlanning />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;