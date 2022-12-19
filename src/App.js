import './App.css';
import { Box } from '@material-ui/core';
import ActionItemKanbanBoard from './components/KanbanBoard/ActionItemKanbanBoard';

function App() {
  return (
    <div className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <Box id="board" style={{ width: '60%' }}>
        <ActionItemKanbanBoard />
      </Box>

    </div>
  );
}

export default App;
