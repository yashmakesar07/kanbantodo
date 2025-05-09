import { Provider } from "react-redux"
import Board from "./components/Board"
import { store } from "./app/store"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
function App() {
  return (
    <div className="h-screen  w-screen flex items-center justify-center">
      <Provider store={store}>
        <DndProvider backend={HTML5Backend} >
          <Board/>
        </DndProvider>
      </Provider>
    </div>
  )
}

export default App
