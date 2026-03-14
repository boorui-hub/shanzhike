
import ApiCourseModule from './components/ApiCourseModule'
import InteractiveExtractModule from './components/InteractiveExtractModule'
import InteractiveTutorModule from './components/InteractiveTutorModule'

function App() {
  return (
    <div className="App">
      <header className="container max-w-1200 mx-auto p-4 border-b">
        <h1>山之课 AI</h1>
      </header>
      <main>
        <ApiCourseModule />
        <InteractiveExtractModule />
        <InteractiveTutorModule />
      </main>
    </div>
  )
}

export default App