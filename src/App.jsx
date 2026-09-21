// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';

// ⭐ ToastContainer + CSS import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './Logistics_Data/Masters/Dashboard';
import Articles from './Logistics_Data/Masters/Articles';
import VehicleType from './Logistics_Data/Masters/VehicleType';
import BillingVehicleType from './Logistics_Data/Masters/BillingVehicleType';
import SACcode from './Logistics_Data/Masters/SACcode';
import GSTmaster from './Logistics_Data/Masters/GSTmaster';
import TDSmaster from './Logistics_Data/Masters/TDSmaster';
import Places from './Logistics_Data/Masters/Places';
import Branches from './Logistics_Data/ParentMasters/Branches'
import Employees from './Logistics_Data/ParentMasters/Employees';
import Customers from './Logistics_Data/ParentMasters/Customers'
import PartNumber from './Logistics_Data/ParentMasters/PartNumber'
import Vehicle from './Logistics_Data/ParentMasters/Vehicle'
import Transporter from './Logistics_Data/ParentMasters/Transporter'
import Drivers from './Logistics_Data/ParentMasters/Drivers'
import LocationDistance from './Logistics_Data/ParentMasters/LocationDistance';
import TransportPickupOrder from './Logistics_Data/TransactionsAndLogistics/TransportPickupOrder'
import LorryReceipt from './Logistics_Data/TransactionsAndLogistics/LorryReceipt'
import FreightMemo from './Logistics_Data/TransactionsAndLogistics/FreightMemo';
import PODUpload from './Logistics_Data/TransactionsAndLogistics/POD'
import GateOperations from './Logistics_Data/WarehouseWMS/GateOperations';
import WMSdashboard from './Logistics_Data/WarehouseWMS/WMSdashboard'
import DirectedPutaway from './Logistics_Data/WarehouseWMS/DirectedPutaway'
import OutwardPlanning from './Logistics_Data/WarehouseWMS/OutwardPlanning'
import RepackAndSplit from './Logistics_Data/WarehouseWMS/RepackAndSplit'
import StockAudit from './Logistics_Data/WarehouseWMS/StockAudit'
import AuditReport from './Logistics_Data/Reports/AuditReport'
import GatePassReport from './Logistics_Data/Reports/GatePassReport'
import MISreport from './Logistics_Data/Reports/MISreport'
import StockReport from './Logistics_Data/Reports/StockReport'
import LRreport from './Logistics_Data/Reports/LRreport'
import DCreport from './Logistics_Data/Reports/DCreport'
import MemoReport from './Logistics_Data/Reports/MemoReport'
import TransportBillReport from './Logistics_Data/Reports/TransportBillReport'
import TransportPurchaseOrder from './Logistics_Data/Accounts/CustomerPurchaseOrder/TransportPurchaseOrder';
import WarehousePurchaseOrder from './Logistics_Data/Accounts/CustomerPurchaseOrder/WarehousePurchaseOrder'
import TransportInvoice from './Logistics_Data/Accounts/Invoice/TransportInvoice';
import WarehouseInvoice from './Logistics_Data/Accounts/Invoice/WarehouseInvoice';
import TransportBill from './Logistics_Data/Accounts/Bills/TransportBill';

function App() {
  return (
    <BrowserRouter>
      {/* ⭐ ToastContainer — सर्व pages वर काम करेल */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="masters/articles" element={<Articles />} />
          <Route path='masters/vehicle-type' element={<VehicleType />} />
          <Route path='masters/billing-vehicle-type' element={<BillingVehicleType />} />
          <Route path='masters/sac-code' element={<SACcode />} />
          <Route path='masters/gst-master' element={<GSTmaster />} />
          <Route path='masters/tds-master' element={<TDSmaster />} />
          <Route path='masters/places' element={<Places />} />
          <Route path='parent-masters/branches' element={<Branches />} />
          <Route path='parent-masters/employees' element={<Employees />} />
          <Route path='parent-masters/customers' element={<Customers />} />
          <Route path='parent-masters/part-number' element={<PartNumber />} />
          <Route path='parent-masters/vehicle' element={<Vehicle />} />
          <Route path='parent-masters/transporter' element={<Transporter />} />
          <Route path='parent-masters/drivers' element={<Drivers />} />
          <Route path='parent-masters/employees' element={<Employees />} />
          <Route path='parent-masters/location-distance' element={<LocationDistance />} />
          <Route path='accounts/customer-purchase-order/transport' element={<TransportPurchaseOrder/>}/>
          <Route path='accounts/customer-purchase-order/warehouse' element={<WarehousePurchaseOrder/>}/>
          <Route path='accounts/invoice/transportinvoice' element={<TransportInvoice/>}/>
          <Route path='accounts/invoice/warehouseinvoice' element={<WarehouseInvoice/>}/>
          <Route path='accounts/bills/transport-bill' element={<TransportBill/>}/>
          <Route path='transactions/transport-pickup-order' element={<TransportPickupOrder />} />
          <Route path='transactions/lorry-receipt' element={<LorryReceipt />} />
          <Route path='transactions/freight-memo' element={<FreightMemo />}></Route>
          <Route path='transactions/pod-upload' element={<PODUpload />}></Route>
          <Route path='warehouse-wms/gate-operations' element={<GateOperations />} />
          <Route path='warehouse-wms/dashboard' element={<WMSdashboard />} />
          <Route path='warehouse-wms/directed-putaway' element={<DirectedPutaway />} />
          <Route path='warehouse-wms/outward-planning' element={<OutwardPlanning />} />
          <Route path='warehouse-wms/repack-split' element={<RepackAndSplit />} />
          <Route path='warehouse-wms/stock-audit' element={<StockAudit />}></Route>
          <Route path='reports/audit-report' element={<AuditReport />}></Route>
          <Route path='reports/gate-pass-report' element={<GatePassReport />} />
          <Route path='reports/mis-report' element={<MISreport />} />
          <Route path='reports/stock-report' element={<StockReport />} />
          <Route path='reports/lr-report' element={<LRreport />} />
          <Route path='reports/dc-report' element={<DCreport />} />
          <Route path='reports/memo-report' element={<MemoReport />} />
          <Route path='reports/transport-bill-report' element={<TransportBillReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;