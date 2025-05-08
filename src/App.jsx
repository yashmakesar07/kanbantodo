import { Provider } from "react-redux"
import Board from "./components/Board"
import { store } from "./app/store"
function App() {
  return (
    <div className="h-screen  w-screen flex items-center justify-center">
      <Provider store={store}>
        <Board/>
      </Provider>
    </div>
  )
}

export default App
