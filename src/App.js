import { Box } from '@material-ui/core';
import ActionItemKanbanBoard from './components/KanbanBoard/ActionItemKanbanBoard';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <Box id="board" style={{ width: '80%' }}>
        <ActionItemKanbanBoard />
      </Box>

    </div>
  );
}

export default App;
