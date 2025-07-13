import { BrowserRouter } from 'react-router-dom';
import ProductEditor from './components/ProductEditor/ProductEditor';

function App() {
  return (
    <BrowserRouter>
      <ProductEditor />
    </BrowserRouter>
  );
}

export default App;