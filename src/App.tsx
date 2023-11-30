import { Counter } from "./pages/counter"
import Posts from "./pages/posts"


function App() {

  return (
   <main>
    <h1>React Redux</h1>
    <Counter />

    <div style={{marginTop: "2rem"}}>
      <Posts />
    </div>
   </main>
  )
}

export default App
